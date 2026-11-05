// public/excel/excel-xlsx-writer.js
// Manodemy Excel Studio — Zero-Dependency Genuine OOXML .xlsx Writer (Stage 5)
// Creates authentic multi-sheet .xlsx workbooks using store-only ZIP (Method 0) + CRC-32.
// Fully compliant with Microsoft 365, Google Sheets, LibreOffice, and openpyxl.

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./excel-engine'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./excel-engine'));
  } else {
    root.ExcelXLSXWriter = factory(root.ExcelEngine);
  }
}(typeof self !== 'undefined' ? self : this, function (ExcelEngine) {
  'use strict';

  // ── 1. CRC-32 Table & Checksum Calculation ─────────────────────────────────
  const crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c >>> 0;
  }

  function crc32(buffer) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < buffer.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ buffer[i]) & 0xFF];
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  // ── 2. Store-Only ZIP Builder (Compression Method 0) ──────────────────────
  class StoreZip {
    constructor() {
      this.files = [];
    }

    addFile(filename, contentStr) {
      const encoder = new TextEncoder();
      const data = encoder.encode(contentStr);
      const crc = crc32(data);
      this.files.push({
        filename,
        data,
        crc,
        size: data.length
      });
    }

    buildUint8Array() {
      let localOffset = 0;
      const localParts = [];
      const centralParts = [];

      for (const f of this.files) {
        const nameBytes = new TextEncoder().encode(f.filename);
        
        // ── Local File Header (30 bytes + name length) ──────────────────────
        const lfh = new Uint8Array(30 + nameBytes.length);
        const lfhView = new DataView(lfh.buffer);
        lfhView.setUint32(0, 0x04034b50, true); // Local header signature
        lfhView.setUint16(4, 20, true);         // Version needed: 2.0
        lfhView.setUint16(6, 0x0800, true);     // General purpose bit flag (UTF-8)
        lfhView.setUint16(8, 0, true);          // Compression method: 0 (Store)
        lfhView.setUint16(10, 0, true);         // Mod time
        lfhView.setUint16(12, 0, true);         // Mod date
        lfhView.setUint32(14, f.crc, true);     // CRC-32
        lfhView.setUint32(18, f.size, true);    // Compressed size
        lfhView.setUint32(22, f.size, true);    // Uncompressed size
        lfhView.setUint16(26, nameBytes.length, true); // Filename length
        lfhView.setUint16(28, 0, true);         // Extra field length
        lfh.set(nameBytes, 30);

        localParts.push(lfh);
        localParts.push(f.data);

        // ── Central Directory File Header (46 bytes + name length) ──────────
        const cdh = new Uint8Array(46 + nameBytes.length);
        const cdhView = new DataView(cdh.buffer);
        cdhView.setUint32(0, 0x02014b50, true); // Central directory signature
        cdhView.setUint16(4, 20, true);         // Version made by
        cdhView.setUint16(6, 20, true);         // Version needed
        cdhView.setUint16(8, 0x0800, true);     // UTF-8 flag
        cdhView.setUint16(10, 0, true);         // Method: 0
        cdhView.setUint16(12, 0, true);         // Mod time
        cdhView.setUint16(14, 0, true);         // Mod date
        cdhView.setUint32(16, f.crc, true);     // CRC-32
        cdhView.setUint32(20, f.size, true);    // Compressed size
        cdhView.setUint32(24, f.size, true);    // Uncompressed size
        cdhView.setUint16(28, nameBytes.length, true);
        cdhView.setUint16(30, 0, true);         // Extra field length
        cdhView.setUint16(32, 0, true);         // File comment length
        cdhView.setUint16(34, 0, true);         // Disk start
        cdhView.setUint16(36, 0, true);         // Internal attributes
        cdhView.setUint32(38, 0, true);         // External attributes
        cdhView.setUint32(42, localOffset, true); // Relative offset of local header
        cdh.set(nameBytes, 46);

        centralParts.push(cdh);
        localOffset += lfh.length + f.data.length;
      }

      const centralOffset = localOffset;
      let centralSize = 0;
      for (const c of centralParts) centralSize += c.length;

      // ── End of Central Directory Record (22 bytes) ────────────────────────
      const eocd = new Uint8Array(22);
      const eocdView = new DataView(eocd.buffer);
      eocdView.setUint32(0, 0x06054b50, true); // EOCD signature
      eocdView.setUint16(4, 0, true);          // Disk number
      eocdView.setUint16(6, 0, true);          // Disk with central dir
      eocdView.setUint16(8, this.files.length, true);  // Entries on this disk
      eocdView.setUint16(10, this.files.length, true); // Total entries
      eocdView.setUint32(12, centralSize, true);       // Size of central dir
      eocdView.setUint32(16, centralOffset, true);     // Offset of central dir
      eocdView.setUint16(20, 0, true);                 // Comment length

      // Combine all parts into single contiguous buffer
      const totalLen = localOffset + centralSize + 22;
      const result = new Uint8Array(totalLen);
      let cur = 0;

      for (const p of localParts) {
        result.set(p, cur);
        cur += p.length;
      }
      for (const p of centralParts) {
        result.set(p, cur);
        cur += p.length;
      }
      result.set(eocd, cur);

      return result;
    }
  }

  // ── 3. OOXML XML Generators ────────────────────────────────────────────────
  function escapeXML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  function generateContentTypes(sheetCount) {
    let xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n`;
    xml += `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">\n`;
    xml += `  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>\n`;
    xml += `  <Default Extension="xml" ContentType="application/xml"/>\n`;
    xml += `  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>\n`;
    xml += `  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>\n`;
    for (let i = 1; i <= sheetCount; i++) {
      xml += `  <Override PartName="/xl/worksheets/sheet${i}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>\n`;
    }
    xml += `</Types>`;
    return xml;
  }

  function generateRootRels() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n` +
      `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n` +
      `  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>\n` +
      `</Relationships>`;
  }

  function generateWorkbookRels(sheetCount) {
    let xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n`;
    xml += `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n`;
    xml += `  <Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>\n`;
    for (let i = 1; i <= sheetCount; i++) {
      xml += `  <Relationship Id="rId${i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i}.xml"/>\n`;
    }
    xml += `</Relationships>`;
    return xml;
  }

  function generateWorkbookXML(sheetNames) {
    let xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n`;
    xml += `<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">\n`;
    xml += `  <sheets>\n`;
    sheetNames.forEach((name, i) => {
      xml += `    <sheet name="${escapeXML(name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>\n`;
    });
    xml += `  </sheets>\n`;
    xml += `</workbook>`;
    return xml;
  }

  function generateStylesXML() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n` +
      `<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">\n` +
      `  <fonts count="2">\n` +
      `    <font><name val="Calibri"/><sz val="11"/></font>\n` +
      `    <font><name val="Calibri"/><sz val="11"/><b val="1"/><color rgb="FFFFFFFF"/></font>\n` +
      `  </fonts>\n` +
      `  <fills count="3">\n` +
      `    <fill><patternFill patternType="none"/></fill>\n` +
      `    <fill><patternFill patternType="gray125"/></fill>\n` +
      `    <fill><patternFill patternType="solid"><fgColor rgb="FF107C41"/></patternFill></fill>\n` +
      `  </fills>\n` +
      `  <borders count="1">\n` +
      `    <border><left/><right/><top/><bottom/></border>\n` +
      `  </borders>\n` +
      `  <cellStyleXfs count="1">\n` +
      `    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>\n` +
      `  </cellStyleXfs>\n` +
      `  <cellXfs count="2">\n` +
      `    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>\n` +
      `    <xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/>\n` +
      `  </cellXfs>\n` +
      `</styleSheet>`;
  }

  function generateWorksheetXML(sheetStore) {
    let xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n`;
    xml += `<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">\n`;
    xml += `  <sheetData>\n`;

    // Group cells by row
    const rowMap = new Map();
    sheetStore.cells.forEach((cell, key) => {
      const [rStr, cStr] = key.split(':');
      const r = parseInt(rStr, 10);
      const c = parseInt(cStr, 10);
      if (!rowMap.has(r)) rowMap.set(r, []);
      rowMap.get(r).push({ col: c, cell });
    });

    const sortedRowIndices = Array.from(rowMap.keys()).sort((a, b) => a - b);

    for (const r of sortedRowIndices) {
      const rowNumber = r + 1;
      xml += `    <row r="${rowNumber}">\n`;
      const cols = rowMap.get(r).sort((a, b) => a.col - b.col);

      for (const item of cols) {
        const cell = item.cell;
        const colLetter = ExcelEngine.colIndexToName(item.col);
        const cellRef = `${colLetter}${rowNumber}`;
        const isHeader = (r === 0);
        const styleAttr = isHeader ? ` s="1"` : ``;

        if (cell.formula) {
          const cleanFormula = cell.formula.replace(/^=/, '');
          xml += `      <c r="${cellRef}"${styleAttr}><f>${escapeXML(cleanFormula)}</f>`;
          if (typeof cell.value === 'number') {
            xml += `<v>${cell.value}</v>`;
          } else if (cell.value !== null && cell.value !== undefined) {
            xml += `<v>${escapeXML(cell.value)}</v>`;
          }
          xml += `</c>\n`;
        } else if (typeof cell.value === 'number') {
          xml += `      <c r="${cellRef}"${styleAttr}><v>${cell.value}</v></c>\n`;
        } else if (cell.value !== null && cell.value !== undefined && cell.value !== '') {
          xml += `      <c r="${cellRef}" t="inlineStr"${styleAttr}><is><t>${escapeXML(cell.value)}</t></is></c>\n`;
        }
      }
      xml += `    </row>\n`;
    }

    xml += `  </sheetData>\n`;
    xml += `</worksheet>`;
    return xml;
  }

  // ── 4. Main Export API ─────────────────────────────────────────────────────
  function generateXLSXBuffer(workbook) {
    const zip = new StoreZip();
    const sheetNames = Array.from(workbook.sheets.keys());

    // 1. [Content_Types].xml
    zip.addFile('[Content_Types].xml', generateContentTypes(sheetNames.length));

    // 2. _rels/.rels
    zip.addFile('_rels/.rels', generateRootRels());

    // 3. xl/workbook.xml
    zip.addFile('xl/workbook.xml', generateWorkbookXML(sheetNames));

    // 4. xl/_rels/workbook.xml.rels
    zip.addFile('xl/_rels/workbook.xml.rels', generateWorkbookRels(sheetNames.length));

    // 5. xl/styles.xml
    zip.addFile('xl/styles.xml', generateStylesXML());

    // 6. xl/worksheets/sheet{N}.xml
    sheetNames.forEach((sheetName, i) => {
      const sheetStore = workbook.sheets.get(sheetName);
      zip.addFile(`xl/worksheets/sheet${i + 1}.xml`, generateWorksheetXML(sheetStore));
    });

    return zip.buildUint8Array();
  }

  function downloadWorkbook(workbook, filename = "Manodemy_Day01_Sales_Practice.xlsx") {
    const buffer = generateXLSXBuffer(workbook);
    if (typeof window !== 'undefined' && window.Blob) {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    return buffer;
  }

  return {
    generateXLSXBuffer,
    downloadWorkbook
  };
}));

