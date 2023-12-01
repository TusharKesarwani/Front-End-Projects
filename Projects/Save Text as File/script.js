const textarea = document.querySelector("textarea"),
  fileNameInput = document.querySelector(".file-name input"),
  selectMenu = document.querySelector(".save-as select"),
  saveBtn = document.querySelector(".save-btn");

selectMenu.addEventListener("change", () => {
  let selectOption = selectMenu.options[selectMenu.selectedIndex].text;
  saveBtn.innerText = `Save as ${selectOption.split(" ")[0]} File`;
});

saveBtn.addEventListener("click", async () => {
  const content = textarea.value;
  const contentType = selectMenu.value;
  const fileName = fileNameInput.value;
  const link = document.createElement("a");
  link.download = fileName;

  // if the format is .pdf use the pdf-lib package otherwise use the default code
  if (selectMenu.value === "application/pdf") {
    const pdfDoc = await PDFLib.PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    page.drawText(content, {
      x: width - 540,
      y: height - 55,
      size: 12,
    });
    // console.log(width);
    // console.log(height);
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: contentType });
    const fileUrl = URL.createObjectURL(blob);
    link.href = fileUrl;
    link.click();
  } else {
    const blob = new Blob([content], { type: contentType });
    const fileUrl = URL.createObjectURL(blob);
    link.href = fileUrl;
    link.click();
  }
});
