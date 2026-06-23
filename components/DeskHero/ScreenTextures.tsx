"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";

export function useScreenTextures(stage: "off" | "sql" | "excel" | "python" | "phone" | "finale") {
  const [textures, setTextures] = useState<{
    sql: THREE.CanvasTexture | null;
    excel: THREE.CanvasTexture | null;
    python: THREE.CanvasTexture | null;
    phone: THREE.CanvasTexture | null;
  }>({ sql: null, excel: null, python: null, phone: null });

  useEffect(() => {
    // 1. Generate Subpixel Stripe Pattern for screen realism pass
    const subpixelCanvas = document.createElement("canvas");
    subpixelCanvas.width = 6;
    subpixelCanvas.height = 2;
    const subCtx = subpixelCanvas.getContext("2d");
    if (subCtx) {
      // Red, Green, Blue stripes
      subCtx.fillStyle = "rgba(255, 0, 0, 0.4)";
      subCtx.fillRect(0, 0, 2, 2);
      subCtx.fillStyle = "rgba(0, 255, 0, 0.4)";
      subCtx.fillRect(2, 0, 2, 2);
      subCtx.fillStyle = "rgba(0, 0, 255, 0.4)";
      subCtx.fillRect(4, 0, 2, 2);
    }

    // 2. Realism Compositor Function
    const applyRealismPass = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      const w = canvas.width;
      const h = canvas.height;

      // 1. CRT RGB Subpixel Overlay (blend mode: overlay)
      ctx.save();
      const pattern = ctx.createPattern(subpixelCanvas, "repeat");
      if (pattern) {
        ctx.globalCompositeOperation = "overlay";
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.restore();

      // 2. Pre-bloom Text Glow (threshold bright -> blur -> additive blend)
      // Create offscreen glow mask
      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = w / 4; // downsample for cheap blur
      maskCanvas.height = h / 4;
      const maskCtx = maskCanvas.getContext("2d");
      if (maskCtx) {
        maskCtx.drawImage(canvas, 0, 0, w / 4, h / 4);
        
        // Additive blend of blurred glow mask back onto main canvas
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.globalAlpha = 0.2;
        ctx.filter = "blur(3px)";
        ctx.drawImage(maskCanvas, 0, 0, w, h);
        ctx.restore();
      }

      // 3. Faint screen blur (lens diffusion simulation using temp canvas to avoid self-drawing undefined behavior)
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = w;
      tempCanvas.height = h;
      const tempCtx = tempCanvas.getContext("2d");
      if (tempCtx) {
        tempCtx.drawImage(canvas, 0, 0);
        ctx.save();
        ctx.filter = "blur(0.8px)";
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(tempCanvas, 0, 0);
        ctx.restore();
      }
    };

    // 3. Render SQL Texture
    const sqlCanvas = document.createElement("canvas");
    sqlCanvas.width = 2048;
    sqlCanvas.height = 1024;
    const sqlCtx = sqlCanvas.getContext("2d");
    if (sqlCtx) {
      // Dark IDE bg
      sqlCtx.fillStyle = "#0B0F19";
      sqlCtx.fillRect(0, 0, 2048, 1024);

      // IDE Titlebar
      sqlCtx.fillStyle = "#141B2D";
      sqlCtx.fillRect(0, 0, 2048, 120);
      sqlCtx.fillStyle = "#FF5F56";
      sqlCtx.beginPath(); sqlCtx.arc(60, 60, 20, 0, Math.PI * 2); sqlCtx.fill();
      sqlCtx.fillStyle = "#FFBD2E";
      sqlCtx.beginPath(); sqlCtx.arc(110, 60, 20, 0, Math.PI * 2); sqlCtx.fill();
      sqlCtx.fillStyle = "#27C93F";
      sqlCtx.beginPath(); sqlCtx.arc(160, 60, 20, 0, Math.PI * 2); sqlCtx.fill();
      sqlCtx.fillStyle = "#8F9CAE";
      sqlCtx.font = "bold 38px monospace";
      sqlCtx.fillText("manodemy_sql_day01.sql", 220, 75);

      // SQL Code Lines
      sqlCtx.font = "500 58px monospace";
      sqlCtx.fillStyle = "#A06CFF"; // keywords
      sqlCtx.fillText("SELECT", 100, 260);
      sqlCtx.fillStyle = "#FFFFFF";
      sqlCtx.fillText(" region, SUM(revenue)", 320, 260);
      
      sqlCtx.fillStyle = "#A06CFF";
      sqlCtx.fillText("FROM", 100, 370);
      sqlCtx.fillStyle = "#FFFFFF";
      sqlCtx.fillText(" sales", 260, 370);
      
      sqlCtx.fillStyle = "#A06CFF";
      sqlCtx.fillText("GROUP BY", 100, 480);
      sqlCtx.fillStyle = "#FFFFFF";
      sqlCtx.fillText(" region;", 380, 480);

      // Badge (Validated + 10 XP)
      sqlCtx.fillStyle = "rgba(63, 213, 122, 0.15)";
      sqlCtx.fillRect(100, 620, 800, 140);
      sqlCtx.strokeStyle = "rgba(63, 213, 122, 0.4)";
      sqlCtx.lineWidth = 4;
      sqlCtx.strokeRect(100, 620, 800, 140);
      sqlCtx.fillStyle = "#3FD97A";
      sqlCtx.font = "bold 52px monospace";
      sqlCtx.fillText("✓ Query Executed  ·  +10 XP", 160, 710);

      applyRealismPass(sqlCanvas, sqlCtx);
    }

    // 4. Render Excel Texture
    const excelCanvas = document.createElement("canvas");
    excelCanvas.width = 2048;
    excelCanvas.height = 1024;
    const excelCtx = excelCanvas.getContext("2d");
    if (excelCtx) {
      // Excel light bg
      excelCtx.fillStyle = "#F3F2F1";
      excelCtx.fillRect(0, 0, 2048, 1024);

      // Formula Bar
      excelCtx.fillStyle = "#FFFFFF";
      excelCtx.fillRect(0, 0, 2048, 120);
      excelCtx.fillStyle = "#107C41"; // Excel Green
      excelCtx.fillRect(0, 0, 120, 120);
      excelCtx.fillStyle = "#FFFFFF";
      excelCtx.font = "bold 44px sans-serif";
      excelCtx.fillText("X", 45, 75);
      
      excelCtx.fillStyle = "#3b3b3b";
      excelCtx.font = "42px sans-serif";
      excelCtx.fillText("fx", 160, 75);
      excelCtx.fillStyle = "#107C41";
      excelCtx.font = "italic 44px monospace";
      excelCtx.fillText("=XLOOKUP(A2, Products!A:A, Products!D:D)", 250, 75);

      // Draw Grid Headers
      excelCtx.fillStyle = "#E1DFDD";
      excelCtx.fillRect(0, 120, 2048, 80);
      excelCtx.strokeStyle = "#D2D0CE";
      excelCtx.lineWidth = 2;
      excelCtx.strokeRect(0, 120, 2048, 80);
      
      excelCtx.fillStyle = "#323130";
      excelCtx.font = "bold 38px sans-serif";
      excelCtx.fillText("A", 180, 175);
      excelCtx.fillText("B", 580, 175);
      excelCtx.fillText("C", 980, 175);
      excelCtx.fillText("D", 1380, 175);

      // Grid Lines & Cells
      excelCtx.font = "38px sans-serif";
      for (let r = 0; r < 8; r++) {
        const y = 200 + r * 90;
        excelCtx.fillStyle = "#F3F2F1";
        excelCtx.fillRect(0, y, 100, 90);
        excelCtx.strokeRect(0, y, 2048, 90);
        
        excelCtx.fillStyle = "#323130";
        excelCtx.fillText(String(r + 1), 35, y + 58);
      }

      // Add Excel contents
      excelCtx.fillText("P001", 150, 258);
      excelCtx.fillText("iPhone 15", 550, 258);
      excelCtx.fillText("$999", 950, 258);
      
      // Badge (Formula Checked + 10 XP)
      excelCtx.fillStyle = "rgba(16, 124, 65, 0.1)";
      excelCtx.fillRect(1200, 240, 750, 140);
      excelCtx.strokeStyle = "rgba(16, 124, 65, 0.3)";
      excelCtx.lineWidth = 4;
      excelCtx.strokeRect(1200, 240, 750, 140);
      excelCtx.fillStyle = "#107C41";
      excelCtx.font = "bold 44px sans-serif";
      excelCtx.fillText("✓ Formula Checked  ·  +10 XP", 1250, 325);

      applyRealismPass(excelCanvas, excelCtx);
    }

    // 5. Render Python Texture
    const pythonCanvas = document.createElement("canvas");
    pythonCanvas.width = 2048;
    pythonCanvas.height = 1024;
    const pythonCtx = pythonCanvas.getContext("2d");
    if (pythonCtx) {
      // Dark IDE bg
      pythonCtx.fillStyle = "#0B0F19";
      pythonCtx.fillRect(0, 0, 2048, 1024);

      // Code Header
      pythonCtx.fillStyle = "#141B2D";
      pythonCtx.fillRect(0, 0, 2048, 120);
      pythonCtx.fillStyle = "#8F9CAE";
      pythonCtx.font = "bold 38px monospace";
      pythonCtx.fillText("escape_tutorial_hell.py", 60, 75);

      // Python Code
      pythonCtx.font = "500 52px monospace";
      pythonCtx.fillStyle = "#FFD23F"; // def keyword
      pythonCtx.fillText("def", 100, 240);
      pythonCtx.fillStyle = "#3FD5FF"; // func name
      pythonCtx.fillText(" verify_active_learning():", 210, 240);
      
      pythonCtx.fillStyle = "#FFD23F";
      pythonCtx.fillText("    return", 140, 330);
      pythonCtx.fillStyle = "#3FD97A"; // string
      pythonCtx.fillText(" \"Tutorial Hell Escaped! 🚀\"", 380, 330);
      
      pythonCtx.fillStyle = "#3FD5FF"; // print
      pythonCtx.fillText("print", 100, 450);
      pythonCtx.fillStyle = "#FFFFFF";
      pythonCtx.fillText("(verify_active_learning())", 270, 450);

      // Terminal Output Box
      pythonCtx.fillStyle = "#070A10";
      pythonCtx.fillRect(100, 560, 1848, 380);
      pythonCtx.strokeStyle = "#1F293D";
      pythonCtx.lineWidth = 3;
      pythonCtx.strokeRect(100, 560, 1848, 380);

      pythonCtx.fillStyle = "#5A6E85";
      pythonCtx.fillText("Terminal - stdout", 140, 620);
      
      pythonCtx.fillStyle = "#3FD5FF"; // Output text
      pythonCtx.font = "bold 58px monospace";
      pythonCtx.fillText("Tutorial Hell Escaped! 🚀", 140, 740);

      // Badge (Graduation Complete + 100 XP)
      pythonCtx.fillStyle = "rgba(242, 193, 78, 0.15)";
      pythonCtx.fillRect(1100, 780, 800, 130);
      pythonCtx.strokeStyle = "rgba(242, 193, 78, 0.4)";
      pythonCtx.lineWidth = 4;
      pythonCtx.strokeRect(1100, 780, 800, 130);
      pythonCtx.fillStyle = "#F2C14E";
      pythonCtx.font = "bold 44px monospace";
      pythonCtx.fillText("✓ Graduation Complete · +100 XP", 1150, 860);

      applyRealismPass(pythonCanvas, pythonCtx);
    }

    // 6. Render Phone Notification Texture
    const phoneCanvas = document.createElement("canvas");
    phoneCanvas.width = 1024;
    phoneCanvas.height = 512;
    const phoneCtx = phoneCanvas.getContext("2d");
    if (phoneCtx) {
      phoneCtx.fillStyle = "#000000";
      phoneCtx.fillRect(0, 0, 1024, 512);

      // iOS Style Banner Background
      phoneCtx.fillStyle = "rgba(28, 28, 30, 0.95)";
      phoneCtx.fillRect(60, 80, 904, 280);
      phoneCtx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      phoneCtx.lineWidth = 2;
      phoneCtx.strokeRect(60, 80, 904, 280);

      // App Icon Badge
      phoneCtx.fillStyle = "#A06CFF";
      phoneCtx.fillRect(100, 120, 70, 70);
      phoneCtx.fillStyle = "#FFFFFF";
      phoneCtx.font = "bold 44px sans-serif";
      phoneCtx.fillText("M", 115, 172);

      // Header Text
      phoneCtx.fillStyle = "#8E8E93";
      phoneCtx.font = "bold 32px sans-serif";
      phoneCtx.fillText("MANODEMY CAREER HUB", 195, 150);
      phoneCtx.font = "30px sans-serif";
      phoneCtx.fillText("now", 860, 150);

      // Notification Body
      phoneCtx.fillStyle = "#FFFFFF";
      phoneCtx.font = "bold 38px sans-serif";
      phoneCtx.fillText("Interview Confirmed", 195, 230);
      phoneCtx.fillStyle = "#D1D1D6";
      phoneCtx.font = "34px sans-serif";
      phoneCtx.fillText("Tomorrow, 10:00 AM — Prepare portfolios.", 195, 290);

      // Subpixel Pass for mobile screen realism
      applyRealismPass(phoneCanvas, phoneCtx);
    }

    // Wrap canvases into Three.js textures
    const tSql = new THREE.CanvasTexture(sqlCanvas);
    tSql.minFilter = THREE.LinearMipmapLinearFilter;
    tSql.generateMipmaps = true;

    const tExcel = new THREE.CanvasTexture(excelCanvas);
    tExcel.minFilter = THREE.LinearMipmapLinearFilter;
    tExcel.generateMipmaps = true;

    const tPython = new THREE.CanvasTexture(pythonCanvas);
    tPython.minFilter = THREE.LinearMipmapLinearFilter;
    tPython.generateMipmaps = true;

    const tPhone = new THREE.CanvasTexture(phoneCanvas);
    tPhone.minFilter = THREE.LinearMipmapLinearFilter;

    setTextures({ sql: tSql, excel: tExcel, python: tPython, phone: tPhone });

    return () => {
      tSql.dispose();
      tExcel.dispose();
      tPython.dispose();
      tPhone.dispose();
    };
  }, []);

  return textures;
}
