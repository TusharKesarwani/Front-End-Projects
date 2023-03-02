const express = require('express')
const path=require('path')
const app = express()
const multer  = require('multer')
const {mergepdf}=require('./merge')
const upload = multer({ dest: 'uploads/' })
app.use('/static',express.static('public'))
//app.use(express.static(__dirname + '/public'));
const port = 3000

app.get('/', (req, res) => {
//   res.send('Hello World!2')
  res.sendFile(path.join(__dirname , "index.html" ))
})

app.post('/merge', upload.array('pdfs', 10), async (req, res, next)=> {
    console.log(req.files);
    //res.send({data:req.files})
    
    let d  = await  mergepdf(path.join(__dirname,req.files[0].path) , path.join(__dirname,req.files[1].path));
    
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
    
    //input.addEventListener("click", upload.array=null);
    // req.files is array of `pdfs` files
    // req.body will contain the text fields, if there were any

    
    
    // let d;
    // for(let i=1;i<pdfPaths.length;i++){
    //   d = mergepdf(path.join(__dirname,req.files[i-1].path),path.join(__dirname,req.files[i].path));
    // }
    // res.redirect(`http://localhost:3000/static/${d}.pdf`)

    // try {
    //   // const pdfPaths = req.files.pdfs.map((pdf) => pdf.path);
    //   pdfs = req.files.getlist('pdfs')
    //   pdfs = list(map(PdfFileReader, pdfs)) 
    //   const mergedPdfPath = await mergepdf(pdfPaths);
    //   res.download(`public/${mergedPdfPath}.pdf`);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).send('An error occurred while merging PDFs');
    // }
  })

app.listen(port, () => {
  console.log(`Example app listening on port https://localhost:${port}`)
})