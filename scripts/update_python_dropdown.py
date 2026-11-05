import re

with open('python/python-engine.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update optionsMenu creation
old_options_menu = """    if (!optionsMenu) {
      optionsMenu = document.createElement('div');
      optionsMenu.className = 'custom-select-options';
      wrapper.appendChild(optionsMenu);
    }"""

new_options_menu = """    if (!optionsMenu) {
      optionsMenu = document.createElement('div');
      optionsMenu.className = select.id === 'daySelect' ? 'custom-select-options day-select-options-menu' : 'custom-select-options';
      wrapper.appendChild(optionsMenu);
    } else if (select.id === 'daySelect') {
      optionsMenu.classList.add('day-select-options-menu');
    }"""

# 2. Update populateOptions
old_populate_section = """    function populateOptions() {
      optionsMenu.innerHTML = '';
      const svgIcons = window.SVG_TRACK_ICONS || {};
      const allDays = window.COURSE_MANIFEST_60 || [];

      if (select.id === 'daySelect' && allDays.length > 0) {
        // Group all 60 days into 3 categorized sections
        const tracks = [
          { key: 'sql', label: '🗄️ SQL Mastery (Days 01–18)', days: allDays.filter(d => d.track === 'sql') },
          { key: 'excel', label: '📊 Advanced Excel & BI (Days 19–30)', days: allDays.filter(d => d.track === 'excel') },
          { key: 'python', label: '🐍 Python for Data Analysis (Days 31–60)', days: allDays.filter(d => d.track === 'python') }
        ];

        tracks.forEach(trackGroup => {
          const header = document.createElement('div');
          header.className = 'dropdown-section-header';
          header.innerHTML = `<span>${trackGroup.label}</span>`;
          optionsMenu.appendChild(header);

          trackGroup.days.forEach(d => {
            const isSelected = (select.value === d.id || currentDayId === d.id);
            const isLocked = (!d.prepared && !d.free);
            const optionItem = document.createElement('div');
            optionItem.className = `custom-select-option${isSelected ? ' selected' : ''}${isLocked ? ' is-locked' : ''}`;

            const iconSvg = svgIcons[d.track] || '';
            const dayNumStr = String(d.trackDay || d.globalDay).padStart(2, '0');

            let badgeHtml = '';
            if (isLocked) {
              badgeHtml = '<span class="day-coming-soon-badge" title="Under active development">Coming Soon</span>';
            } else if (d.free) {
              badgeHtml = '<span class="day-free-badge">FREE</span>';
            }

            optionItem.innerHTML = `
              <span class="option-day-tag">
                <span class="track-icon-wrap">${iconSvg}</span>
                <span style="display:flex;flex-direction:column;gap:1px;overflow:hidden;">
                  <strong>Day ${dayNumStr}</strong>
                  <span class="option-day-title">${d.title}</span>
                </span>
              </span>
              ${badgeHtml}
            `;

            optionItem.dataset.value = d.id;
            optionItem.addEventListener('click', (e) => {
              e.stopPropagation();
              if (isLocked) {
                alert(`Day ${dayNumStr} (${d.title}) is currently under active preparation and coming soon!`);
                return;
              }
              window.location.href = d.url;
            });
            optionsMenu.appendChild(optionItem);
          });
        });"""

new_populate_section = """    function populateOptions() {
      optionsMenu.innerHTML = '';
      const svgIcons = window.SVG_TRACK_ICONS || {
        python: `<svg viewBox="0 0 24 24" fill="none" style="width:14px;height:14px;"><path d="M11.927 2.1c-4.225 0-3.957 1.83-3.957 1.83l.004 1.895h4.033v.57H6.33S3.5 6.064 3.5 10.284c0 4.22 2.47 4.07 2.47 4.07h1.474v-2.07s-.08-2.47 2.43-2.47h4.167s2.35.038 2.35-2.312V4.012S16.85 2.1 11.927 2.1zm-2.22 1.342a.84.84 0 1 1 0 1.68.84.84 0 0 1 0-1.68z" fill="#3b82f6"/><path d="M12.073 21.9c4.225 0 3.957-1.83 3.957-1.83l-.004-1.895h-4.033v-.57h5.677s2.83.33 2.83-3.89c0-4.22-2.47-4.07-2.47-4.07h-1.474v2.07s.08 2.47-2.43 2.47h-4.167s-2.35-.038-2.35 2.312v3.488s-.458 1.912 4.464 1.912zm2.22-1.342a.84.84 0 1 1 0-1.68.84.84 0 0 1 0 1.68z" fill="#eab308"/></svg>`,
        sql: `<svg viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"></path></svg>`,
        excel: `<svg viewBox="0 0 23 23" fill="none" style="width:14px;height:14px;"><path d="M14.625 0H8.625L1.5 2.625V20.375L8.625 23H14.625V0Z" fill="#107C41"/><path d="M21.5 2.625H14.625V6.375H21.5V2.625Z" fill="#1F9A55"/><path d="M21.5 6.375H14.625V10.125H21.5V6.375Z" fill="#33C481"/><path d="M21.5 10.125H14.625V13.875H21.5V10.125Z" fill="#107C41"/><path d="M21.5 13.875H14.625V17.625H21.5V13.875Z" fill="#1B9A59"/><path d="M21.5 17.625H14.625V20.375H21.5V17.625Z" fill="#107C41"/><path d="M10.125 6.375H3.375V16.625H10.125V6.375Z" fill="#107C41"/><path d="M11.813 7.875L9.938 11.25L11.813 14.625H9.563L8.438 12.75L7.313 14.625H5.063L6.938 11.25L5.063 7.875H7.313L8.438 9.75L9.563 7.875H11.813Z" fill="white"/></svg>`
      };
      let allDays = window.COURSE_MANIFEST_60 || [];
      if ((!allDays || allDays.length === 0) && window.COURSE_MANIFEST && window.COURSE_MANIFEST.length > 0) {
        allDays = window.COURSE_MANIFEST.map(d => ({
          track: 'python',
          trackDay: d.day,
          globalDay: (d.day || 0) + 30,
          id: d.id,
          title: d.title,
          free: true,
          prepared: true,
          comingSoon: false,
          url: `/python/day${String(d.day).padStart(2, '0')}.html`
        }));
      }

      if (select.id === 'daySelect' && allDays.length > 0) {
        // Group all 60 days into 3 categorized sections: Python FIRST, then SQL, then Excel
        const tracks = [
          { key: 'python', label: '🐍 Python for Data Analysis (Days 01–30)', days: allDays.filter(d => d.track === 'python') },
          { key: 'sql', label: '🗄️ SQL Mastery (Days 01–18)', days: allDays.filter(d => d.track === 'sql') },
          { key: 'excel', label: '📊 Excel Mastery (Days 01–12)', days: allDays.filter(d => d.track === 'excel') }
        ];

        tracks.forEach(trackGroup => {
          if (!trackGroup.days || trackGroup.days.length === 0) return;
          const header = document.createElement('div');
          header.className = 'dropdown-section-header';
          header.innerHTML = `<span>${trackGroup.label}</span>`;
          optionsMenu.appendChild(header);

          trackGroup.days.forEach(d => {
            const currentDayNum = parseInt(String(currentDayId || select.value || '').replace(/\\D+/g, ''), 10) || window.COURSE_DAY || 1;
            const isCurrentPython = (d.track === 'python' && (d.id === currentDayId || d.trackDay === currentDayNum));
            const isLocked = (!d.prepared && !d.free);
            const optionItem = document.createElement('div');
            optionItem.className = `custom-select-option${isCurrentPython ? ' selected' : ''}${isLocked ? ' is-locked' : ''}`;

            const iconSvg = svgIcons[d.track] || '';
            const dayNumStr = String(d.trackDay || (d.globalDay && d.track === 'python' ? d.globalDay - 30 : d.globalDay) || 1).padStart(2, '0');

            let badgeHtml = '';
            if (d.comingSoon && !d.prepared) {
              badgeHtml = '<span class="day-coming-soon-badge" title="Under active development">Coming Soon</span>';
            } else if (d.free) {
              badgeHtml = '<span class="day-free-badge">FREE</span>';
            } else if (isLocked) {
              badgeHtml = '<span class="day-lock-badge" title="Pro subscription required">🔒</span>';
            }

            optionItem.innerHTML = `
              <span class="option-day-tag">
                <span class="track-icon-wrap">${iconSvg}</span>
                <span style="display:flex;flex-direction:column;gap:1px;overflow:hidden;">
                  <strong>Day ${dayNumStr}</strong>
                  <span class="option-day-title">${d.title}</span>
                </span>
              </span>
              ${badgeHtml}
            `;

            optionItem.dataset.value = d.id;
            optionItem.addEventListener('click', (e) => {
              e.stopPropagation();
              if (isCurrentPython) {
                optionsMenu.classList.remove('open');
                wrapper.classList.remove('open');
                trigger.classList.remove('open');
                return;
              }
              if (d.comingSoon && !d.prepared) {
                if (typeof showComingSoonToast === 'function') {
                  showComingSoonToast(d.title, d.trackDay || d.globalDay);
                } else {
                  alert(`Day ${dayNumStr} (${d.title}) is currently under active preparation and coming soon!`);
                }
                optionsMenu.classList.remove('open');
                wrapper.classList.remove('open');
                trigger.classList.remove('open');
                return;
              }
              window.location.href = d.url;
            });
            optionsMenu.appendChild(optionItem);
          });
        });"""

# 3. Update wrapper.onclick and click outside
old_wrapper_click = """        wrapper.onclick = (e) => {
          e.stopPropagation();
          const isOpen = optionsMenu.classList.contains('open');
          document.querySelectorAll('.custom-select-options').forEach(menu => {
            menu.classList.remove('open');
            menu.parentElement.classList.remove('open');
            if (menu.previousElementSibling) menu.previousElementSibling.classList.remove('open');
          });
          if (!isOpen) {
            optionsMenu.classList.add('open');
            wrapper.classList.add('open');
            trigger.classList.add('open');
          }
        };"""

new_wrapper_click = """        wrapper.onclick = (e) => {
          e.stopPropagation();
          const isOpen = optionsMenu.classList.contains('open');
          document.querySelectorAll('.custom-select-options.open').forEach(menu => {
            menu.classList.remove('open');
            menu.parentElement?.classList.remove('open');
            if (menu.previousElementSibling) menu.previousElementSibling.classList.remove('open');
          });
          if (!isOpen) {
            if (optionsMenu.children.length === 0) {
              populateOptions();
            }
            if (window.innerWidth <= 900) {
              // Body portal on mobile to escape container overflow and backdrop-filter issues
              if (optionsMenu.parentElement !== document.body) {
                document.body.appendChild(optionsMenu);
              }
              const rect = wrapper.getBoundingClientRect();
              optionsMenu.style.position = 'fixed';
              optionsMenu.style.top = Math.max(70, Math.round(rect.bottom + 6)) + 'px';
              optionsMenu.style.left = '10px';
              optionsMenu.style.right = '10px';
              optionsMenu.style.width = 'calc(100vw - 20px)';
              optionsMenu.style.zIndex = '999999';
              optionsMenu.style.maxHeight = '65vh';
            } else {
              // On desktop, keep inside wrapper
              if (optionsMenu.parentElement !== wrapper) {
                wrapper.appendChild(optionsMenu);
              }
              optionsMenu.style.removeProperty('position');
              optionsMenu.style.removeProperty('top');
              optionsMenu.style.removeProperty('left');
              optionsMenu.style.removeProperty('right');
              optionsMenu.style.removeProperty('width');
              optionsMenu.style.removeProperty('zIndex');
              optionsMenu.style.removeProperty('maxHeight');
            }
            optionsMenu.classList.add('open');
            wrapper.classList.add('open');
            trigger.classList.add('open');
          }
        };"""

# Perform replacements normalizing newlines
def replace_chunk(src, old, new):
    norm_src = src.replace('\r\n', '\n')
    norm_old = old.replace('\r\n', '\n')
    norm_new = new.replace('\r\n', '\n')
    if norm_old not in norm_src:
        raise ValueError("Could not find chunk: " + norm_old[:60])
    return norm_src.replace(norm_old, norm_new)

content = replace_chunk(content, old_options_menu, new_options_menu)
content = replace_chunk(content, old_populate_section, new_populate_section)
content = replace_chunk(content, old_wrapper_click, new_wrapper_click)

with open('python/python-engine.js', 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

with open('public/python/python-engine.js', 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print("✅ Successfully updated python/python-engine.js and public/python/python-engine.js!")
