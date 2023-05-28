function ClearCanvas(canvasid) {
    const canvas = document.getElementById(canvasid);
   const ctx = canvas.getContext('2d');
  
   ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  function checkload(img) {
  if ( img === null) {
          alert("Image has not been loaded");
          return; }}
  
     /* FileImput is a standard variable name to use when working with the HTML input type File */
      fileInput = document.getElementById("fileInput");
      var image = null;
      var grayimage = null;
      var redimage = null;
      var brownimage = null;
      var generalcolor = null;
      var Rainbow = null;
      var VerticalRainbow = null;
      var GridPanelImg = null;
      var WaveImg = null;
      var WaveImg2 = null;
      var WaveImg3 = null;
      var TrigSharkImg = null;
      var BlurImage = null;
  
  function drawImage() {
  
    /* The ".files" is a property from the object/variable "file". In the input HTML tag, it is possible to select and upload multiple files, and these are stored 
    in an array, (or list for python), creating a variable calling fileInput.files[0] we are pulling the first stored image in the array. */
      image = fileInput.files[0];
      
    /* In this part of the code I store a new instance of the JavaScript FileReader object in the variable "reader" */
      var reader = new FileReader();
  
    /* Having the above Filereader instance created, the .onload event handler can be triggered by the .readAsDataURL down there outside de inner function and then 
    trigger the inner function itself to create the image object */
      reader.onload = function(){
    
    /* Here the variable dataURL gets the .result property from the reader variable (which is reading a DataURL from the uploaded file) */
        var dataURL = reader.result;
    
    /* Creating a image object and specifying that its source will be the dataURL result from reading the uploaded file */    
        var img = new Image();
        img.src = dataURL;
  
    /* Here the event handler .onload keeps waiting for the above sections to be finished and then calls the following function, getting the canvas id and context
    and using the .drawImage method with 5 attributes: the image itslef; the x position for the image to start being drawed; the respective y position; the width
    and height. */
        img.onload = function(){
          let canvas = document.getElementById("canvas");
          let ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, 1300, 480);
        }
      };
      
    /* The .readAsDataURL method used in the reader object created from the FileReader instance, with the file variable attribute, this method, when finished reading
    the file, will trigger the reader.onload event handler, and continue the code until the draw methods. */
      reader.readAsDataURL(image);
    }
  
  /* Starting the function with the grayscale filter*/
  
    function makeGray() {
  /* Defining constant variables getting the canvas where the image shall be displayed, it's context and creating the new image instance */
      grayimage = fileInput.files[0];
      const canvas_element = document.getElementById('canvas2');
      const ctx = canvas_element.getContext('2d');
      const img = new Image();
      
      checkload(grayimage)
  
  /* Here I am creating an unique URL that reerences the global variable grayimage, and assign this unique URL as the source of my newly created img instance */
      img.src = URL.createObjectURL(grayimage);
  
  /* As the image source is finished getting the URL, it calls img.onload having the image drawn within the canvas */
      img.onload = () => {
      ctx.drawImage(img, 0, 0, 1300, 480);
  
  /* As you have the image drawn, we will get it's data to use into the for applied to calculate the grayscale of each pixel */
      const imageData = ctx.getImageData(0, 0, canvas_element.width, canvas_element.height);
      const data = imageData.data;
  
  /* Apply grayscale filter with for and iteration over each pixel's value. For each pixel, set variable "i" to 0, see if "i" is lower than the pixel's value, sum 4 to "i" and run the following
        code */
  
  /* In this for loop I had different semantics from what I was used to in python, the for parameters are divided in three sectors of validations, separetad with
  semicolons, the first two parts sets the iteration element to zero, then it checks if the data array is over, for the loop to finish in the last pixel.
  The data.length element is actually looking into the JavaScript array containing the Red, Green Blue and Alpha values.
  this array is the same as a python list. And it will run the inner code while "i" is less than the data array lenght.
  And then sets "i" to +4 beggining a new verificatino for the loop, for the next pixel.*/
  
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;     // Red
        data[i + 1] = avg; // Green
        data[i + 2] = avg; // Blue
      }
      // Set the image data back to the canvas
    ctx.putImageData(imageData, 0, 0);
      };}
  
      function RedFilter() {
        
        redimage = fileInput.files[0];
        const canvas_element = document.getElementById('canvas3');
        const ctx = canvas_element.getContext('2d');
  
        const img = new Image();
  
        checkload(redimage)
  
        img.src = URL.createObjectURL(redimage);
  
        img.onload = () => {
        ctx.drawImage(img, 0, 0, 1300, 480);
  
        const imageData = ctx.getImageData(0, 0, canvas_element.width, canvas_element.height);
        const data = imageData.data;
        
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        
        if (avg < 128) {
          data[i] = 2*avg;
          data[i + 1] = 0;
          data[i + 2] = 0;
        } else {
          data[i] = 255;
          data[i + 1] = 2*avg - 255;
          data[i + 2] = 2*avg - 255;
        }}
        
    ctx.putImageData(imageData, 0, 0);
  
      };}
  
      function BrownFilter() {
        brownimage = fileInput.files[0];
        const canvas_element = document.getElementById('canvas4');
        const ctx = canvas_element.getContext('2d');
        const img = new Image();
      
        checkload(brownimage)
  
        img.src = URL.createObjectURL(brownimage);
  
        img.onload = () => {
        ctx.drawImage(img, 0, 0, 1300, 480);
  
        const imageData = ctx.getImageData(0, 0, canvas_element.width, canvas_element.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
           
            if (avg < 128) {
            NewRed = data[i] / 2;
            data[i] = NewRed;
            data[i + 1] = NewRed / 2;
            data[i + 2] = 0;
            } else {
              data[i] = avg;
              NewGreen = avg / 2
              data[i + 1] = NewGreen;
              data[i + 2] = NewGreen / 2;
            }}  
            ctx.putImageData(imageData, 0, 0);
          };}
           
          function GeneralRuleFilter() {
        generalcolor = fileInput.files[0];
        const canvas_element = document.getElementById('canvas5');
        const ctx = canvas_element.getContext('2d');
        const img = new Image();
      
        checkload(generalcolor)
  
        img.src = URL.createObjectURL(generalcolor);
  
        img.onload = () => {
        ctx.drawImage(img, 0, 0, 1300, 480);
  
        const imageData = ctx.getImageData(0, 0, canvas_element.width, canvas_element.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
  
            if (avg < 128) {
            data[i] = 17 / 127.5 * avg;
            data[i + 1] = 170 / 127.5 * avg;
            data[i + 2] = 153 / 127.5 * avg;
            } else {
              data[i] = (2 - 17 / 127.5) * avg + 2 * 17 - 255;
              data[i + 1] = (2 - 170 / 127.5) * avg + 2 * 170 - 255;
              data[i + 2] = (2 - 153 / 127.5) * avg + 2 * 153 - 255;
            }}  
            ctx.putImageData(imageData, 0, 0);
          };}
  
          function Rainbowfilter() {
        Rainbow = fileInput.files[0];
        const canvas_element = document.getElementById('canvas6');
        const ctx = canvas_element.getContext('2d');
        const img = new Image();
      
        checkload(Rainbow)
  
        img.src = URL.createObjectURL(Rainbow);
  
        img.onload = () => {
        ctx.drawImage(img, 0, 0, 1300, 480);
  
        const imageData = ctx.getImageData(0, 0, canvas_element.width, canvas_element.height);
        const data = imageData.data;
        const first_part = canvas_element.width / 3;
        const second_half = canvas_element.width / 3 * 2;
  
        /* In the next for loop I will get the average value for the pixel's RGB, as explained previously, and also uncover the horizontal place of the pixel in the image.
        const x is there for this. The iteration value is incremented by 4 each time the loop repetes, that is because the image itself is described in an great array, and every
        four values of the array represents a full pixel (RGBA). Let's suppose the iteration value is now 52, dividing it by four, which results 13, I know it's the thirteenth pixel of the
        image. A very clever logic is used to uncover the x position of the pixel in the image, the rest of a division between the pixel's position in the array by the width of each line of
        the image results on the index of the pixel, in the specific line, by excluding the upper lines and the pixels before in the same line in the division.
  
        */
        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            const x = (i / 4) % canvas_element.width;
  
            if (x < first_part && avg < 128) {
            data[i] = 255 / 127.5 * avg;
            data[i + 1] = 0 / 127.5 * avg;
            data[i + 2] = 0 / 127.5 * avg;
            } else if (x < first_part && avg >= 128) {
              data[i] = (2 - 255 / 127.5) * avg + 2 * 255 - 255;
              data[i + 1] = (2 - 0 / 127.5) * avg + 2 * 0 - 255;
              data[i + 2] = (2 - 0 / 127.5) * avg + 2 * 0 - 255;
            } else if (x > first_part && x < second_half && avg < 128) {
              data[i] = 102 / 127.5 * avg;
              data[i + 1] = 0 / 127.5 * avg;
              data[i + 2] = 204 / 127.5 * avg;  
            } else if (x > first_part && x < second_half && avg >= 128) {
              data[i] = (2 - 102 / 127.5) * avg + 2 * 102 - 255;
              data[i + 1] = (2 - 0 / 127.5) * avg + 2 * 0 - 255;
              data[i + 2] = (2 - 204 / 127.5) * avg + 2 * 204 - 255;
            } else if (x > second_half && avg < 128) {
              data[i] = 255 / 127.5 * avg;
              data[i + 1] = 153 / 127.5 * avg;
              data[i + 2] = 0 / 127.5 * avg;
            } else {
                data[i] = (2 - 255 / 127.5) * avg + 2 * 255 - 255;
                data[i + 1] = (2 - 153 / 127.5) * avg + 2 * 153 - 255;
                data[i + 2] = (2 - 0 / 127.5) * avg + 2 * 0 - 255;
            }}  
            ctx.putImageData(imageData, 0, 0);
          };}
  
          
          function VerticalRainbowfilter() {
        VerticalRainbow = fileInput.files[0];
        const canvas_element = document.getElementById('canvas7');
        const ctx = canvas_element.getContext('2d');
        const img = new Image();
      
        checkload(VerticalRainbow)
  
        img.src = URL.createObjectURL(VerticalRainbow);
  
        img.onload = () => {
        ctx.drawImage(img, 0, 0, 1300, 480);
  
        const imageData = ctx.getImageData(0, 0, canvas_element.width, canvas_element.height);
        const data = imageData.data;
        const division = canvas_element.height / 7;
        
        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            const y = (i / 4) / canvas_element.width;
  
            //Red
  
            if ( y <= division && avg < 128) {
            data[i] = 255 / 127.5 * avg;
            data[i + 1] = 0 / 127.5 * avg;
            data[i + 2] = 0 / 127.5 * avg;  
            } else if ( y <= division && avg >= 128) {
              data[i] = (2 - 255 / 127.5) * avg + 2 * 255 - 255;
              data[i + 1] = (2 - 0 / 127.5) * avg + 2 * 0 - 255;
              data[i + 2] = (2 - 0 / 127.5) * avg + 2 * 0 - 255;
            }
  
           //Orange
            else if ( y > division && y <= division * 2 && avg < 128) {
              data[i] = 255 / 127.5 * avg;
              data[i + 1] = 153 / 127.5 * avg;
              data[i + 2] = 0 / 127.5 * avg;  
            } else if ( y > division && y <= division * 2 && avg >= 128) {
              data[i] = (2 - 255 / 127.5) * avg + 2 * 255 - 255;
              data[i + 1] = (2 - 153 / 127.5) * avg + 2 * 153 - 255;
              data[i + 2] = (2 - 0 / 127.5) * avg + 2 * 0 - 255;
            }
  
           //Yellow
            else if ( y > division * 2 && y <= division * 3 && avg < 128) {
              data[i] = 255 / 127.5 * avg;
              data[i + 1] = 255 / 127.5 * avg;
              data[i + 2] = 0 / 127.5 * avg;  
            } else if ( y > division * 2 && y <= division * 3 && avg >= 128) {
              data[i] = (2 - 255 / 127.5) * avg + 2 * 255 - 255;
              data[i + 1] = (2 - 255 / 127.5) * avg + 2 * 255 - 255;
              data[i + 2] = (2 - 0 / 127.5) * avg + 2 * 0 - 255;
            }
            
            //Green
            else if ( y > division * 3 && y <= division * 4 && avg < 128) {
              data[i] = 0 / 127.5 * avg;
              data[i + 1] = 255 / 127.5 * avg;
              data[i + 2] = 0 / 127.5 * avg;  
            } else if ( y > division * 3 && y <= division * 4 && avg >= 128) {
              data[i] = (2 - 0 / 127.5) * avg + 2 * 0 - 255;
              data[i + 1] = (2 - 255 / 127.5) * avg + 2 * 255 - 255;
              data[i + 2] = (2 - 0 / 127.5) * avg + 2 * 0 - 255;
            } 
            
            //Blue
            else if ( y > division * 4 && y <= division * 5 && avg < 128) {
              data[i] = 0 / 127.5 * avg;
              data[i + 1] = 0 / 127.5 * avg;
              data[i + 2] = 255 / 127.5 * avg;  
            } else if ( y > division * 4 && y <= division * 5 && avg >= 128) {
              data[i] = (2 - 0 / 127.5) * avg + 2 * 0 - 255;
              data[i + 1] = (2 - 0 / 127.5) * avg + 2 * 0 - 255;
              data[i + 2] = (2 - 255 / 127.5) * avg + 2 * 255 - 255;
            } 
            
            //Purple
            else if ( y > division * 5 && y <= division * 6 && avg < 128) {
              data[i] = 204 / 127.5 * avg;
              data[i + 1] = 0 / 127.5 * avg;
              data[i + 2] = 204 / 127.5 * avg;  
            } else if ( y > division * 5 && y <= division * 6 && avg >= 128) {
              data[i] = (2 - 204 / 127.5) * avg + 2 * 204 - 255;
              data[i + 1] = (2 - 0 / 127.5) * avg + 2 * 0 - 255;
              data[i + 2] = (2 - 204 / 127.5) * avg + 2 * 204 - 255;
            } 
            
            //Pink
            else if ( y > division * 6 && y <= division * 7 && avg < 128) {
              data[i] = 255 / 127.5 * avg;
              data[i + 1] = 51 / 127.5 * avg;
              data[i + 2] = 204 / 127.5 * avg;  
            } else {
              data[i] = (2 - 255 / 127.5) * avg + 2 * 255 - 255;
              data[i + 1] = (2 - 51 / 127.5) * avg + 2 * 51 - 255;
              data[i + 2] = (2 - 204 / 127.5) * avg + 2 * 204 - 255;
            }}
  
            ctx.putImageData(imageData, 0, 0);
          };}
  
      function GridPanel() {
        GridPanelImg = fileInput.files[0];
        const canvas_element = document.getElementById('canvas8');
        const ctx = canvas_element.getContext('2d');
        const img = new Image();
      
        checkload(GridPanelImg)
  
        img.src = URL.createObjectURL(GridPanelImg);
  
        img.onload = () => {
        ctx.drawImage(img, 0, 0, 1300, 480);
  
        const imageData = ctx.getImageData(0, 0, canvas_element.width, canvas_element.height);
        const data = imageData.data;
        const divisionX = canvas_element.width / 3;
        const divisionY = canvas_element.height / 2;
        const xlimit = divisionX - 10;
        const xxlimit = divisionX * 2 - 10;
        const ylimit = divisionY - 10;
  
        
        for (let i = 0; i < data.length; i += 4) {
            const y = (i / 4) / canvas_element.width;
            const x = (i / 4) % canvas_element.width;
  
            if (x <= 30 || x >= canvas_element.width - 30) {
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;        
            }
            else if (y <= 30 || y >= canvas_element.height - 30) {
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0; 
            }
            else if (x >= xlimit && x <= divisionX || x >= xxlimit && x <= divisionX * 2) {
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
            }
            else if (y >= ylimit && y <= divisionY ) {
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
            }
          }
        
        ctx.putImageData(imageData, 0, 0);};}
  
  function Ondulatory() {
    WaveImg = fileInput.files[0];
    const canvas_element = document.getElementById('canvas9');
    const ctx = canvas_element.getContext('2d');
    const img = new Image();
  
    checkload(WaveImg)
  
    img.src = URL.createObjectURL(WaveImg);
  
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 1300, 480);
  
      const imageData = ctx.getImageData(0, 0, canvas_element.width, canvas_element.height);
      const data = imageData.data;
  
      for (let i = 0; i < data.length; i += 4) {
       const y = (i / 4) / canvas_element.width;
       const x = (i / 4) % canvas_element.width;
  
       if (y <= 50 || y >= canvas_element.height - 50) { //O eixo y é contado de cima para baixo
           data[i] = 255;
           data[i + 1] = 255;
           data[i + 2] = 255;
       } else {
            const amplitude = 300; // adjust amplitude as desired
            const frequency = 0.01 // adjust frequency as desired
            const yOffset = Math.cos(x * frequency) * amplitude;
            const newY = Math.floor(y + yOffset);
            
            if (newY > 0 && newY <= canvas_element.height) { //Conforme eu aumento aqui, aumento a altura do branco
              data[i] = 0;
              data[i + 1] = 0;
              data[i + 2] = 0;
            } else {
              data[i] = 255;
              data[i + 1] = 255;
              data[i + 2] = 255;
            }
   } }
  
      ctx.putImageData(imageData, 0, 0);
    };
  }
  
  function Ondulatory2() {
    WaveImg2 = fileInput.files[0];
    const canvas_element = document.getElementById('canvas10');
    const ctx = canvas_element.getContext('2d');
    const img = new Image();
  
    checkload(WaveImg2)
  
    img.src = URL.createObjectURL(WaveImg2);
  
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 1300, 480);
  
      const imageData = ctx.getImageData(0, 0, canvas_element.width, canvas_element.height);
      const data = imageData.data;
  
      for (let i = 0; i < data.length; i += 4) {
       const y = (i / 4) / canvas_element.width;
       const x = (i / 4) % canvas_element.width;
  
       if (y <= 480/4+ 480/8*Math.sin(x*Math.PI/180+1300/2)) { //O eixo y é contado de cima para baixo
           data[i] = 255;
           data[i + 1] = 255;
           data[i + 2] = 255;
       }
       if (y > 3/4*480+480/8*Math.sin(x*Math.PI/180+1300/2)) {
          data[i] = 255;
          data[i + 1] = 255;
          data[i + 2] = 255;
       }
      }
  
      ctx.putImageData(imageData, 0, 0);
    };}
  
    function Ondulatory3() {
    WaveImg3 = fileInput.files[0];  
    const canvas_element = document.getElementById('canvas11');
    const ctx = canvas_element.getContext('2d');
    const img = new Image();
  
    checkload(WaveImg3)
  
    img.src = URL.createObjectURL(WaveImg3);
  
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 1300, 480);
  
      const imageData = ctx.getImageData(0, 0, canvas_element.width, canvas_element.height);
      const data = imageData.data;
  
      for (let i = 0; i < data.length; i += 4) {
       const y = (i / 4) / canvas_element.width;
       const x = (i / 4) % canvas_element.width;
  
       if (y <= 480/4+ 480/8*Math.sin(x*Math.PI/180+1300/2)) { //O eixo y é contado de cima para baixo
           data[i] = 255;
           data[i + 1] = 255;
           data[i + 2] = 255;
       } else if (y > 3/4*480+480/8*Math.sin(x*Math.PI/180+1300/2)) {
          data[i] = 255;
          data[i + 1] = 255;
          data[i + 2] = 255;
       } else {
          data[i] = 0;
          data[i + 1] = 0;
          data[i + 2] = 0;
       }
      }
  
      ctx.putImageData(imageData, 0, 0);
    };}
  
    function Trigonometry_Shark() {
    TrigSharkImg = fileInput.files[0];
    const canvas_element = document.getElementById('canvas12');
    const ctx = canvas_element.getContext('2d');
    const img = new Image();
  
    checkload(TrigSharkImg)
  
    img.src = URL.createObjectURL(TrigSharkImg);
  
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 1300, 480);
  
      const imageData = ctx.getImageData(0, 0, canvas_element.width, canvas_element.height);
      const data = imageData.data;
  
      for (let i = 0; i < data.length; i += 4) {
       const y = (i / 4) / canvas_element.width;
       const x = (i / 4) % canvas_element.width;
  
       if (y <= 480/4+ 480/8*Math.sin(x*Math.PI/180+1300/2)) {
           data[i] = 0;
           data[i + 1] = 0;
           data[i + 2] = 0;
       } else if (y > 3/4*480+480/8*Math.sin(x*Math.PI/180+1300/2)) {
          data[i] = 0;
          data[i + 1] = 0;
          data[i + 2] = 0;
       } else {
          data[i + 3] = 100;
       }
      }
  
      ctx.putImageData(imageData, 0, 0);
    };}
  
    function checkBorder(pixel, size){
      if (pixel < 0) {
        return 0;}
      
      else if (pixel > size-1) {
        return size-1;}
      
      else {
        return pixel;}
    }
  
    function nearbyPixel(x, y, ctx) {
        let xOffset = Math.floor(Math.random()*10);
        var yOffset = Math.floor(Math.random()*10);
        var new_Pixel_Width = checkBorder(x+xOffset, ctx.canvas.width);
        var new_Pixel_Height = checkBorder(y+yOffset, ctx.canvas.height);
        let imageData = ctx.getImageData(new_Pixel_Width, new_Pixel_Height, 1, 1).data; 
        return imageData;
    }
  
    /*ctx.getImageData()" é um método que obtém dados de pixel da imagem. "ctx" é o contexto do canvas HTML5 em que a imagem é desenhada. Este método recebe quatro argumentos:
  "new_Pixel_Width": é a largura do pixel que será capturado.
  "new_Pixel_Height": é a altura do pixel que será capturado.
  "1": é o número de pixels em largura que serão capturados. Neste caso, apenas um pixel está sendo capturado.
  "1": é o número de pixels em altura que serão capturados. Neste caso, apenas um pixel está sendo capturado.
  ".data" é uma propriedade do objeto retornado por "ctx.getImageData()". Ele contém uma matriz de quatro elementos para cada pixel capturado (vermelho, verde, azul e alfa), representando a cor do pixel no formato RGBA (Red, Green, Blue, Alpha).
  Portanto, a linha de código "let imageData = ctx.getImageData(new_Pixel_Width, new_Pixel_Height, 1, 1).data;" está capturando a cor do pixel na posição (new_Pixel_Width, new_Pixel_Height) da imagem desenhada no canvas, e armazenando-a na variável "imageData" como um array contendo os valores das cores RGBA desse pixel. */
  
    function BlurImg() {
    BlurImage = fileInput.files[0];  
    const canvas_element = document.getElementById('canvas13');
    const ctx = canvas_element.getContext('2d');
    const img = new Image();
  
    checkload(BlurImage)
    
    img.src = URL.createObjectURL(BlurImage);
  
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 1300, 480);
  
      const imageData = ctx.getImageData(0, 0, canvas_element.width, canvas_element.height);
      const data = imageData.data;
  
      for (let i = 0; i < data.length; i += 4) {
       const y = (i / 4) / canvas_element.width;
       const x = (i / 4) % canvas_element.width;
       let randomic = Math.random();
  
        if (randomic > 0.5) {
          data[i] = data[i];
          data[i + 1] = data[i + 1];
          data[i + 2] = data[i + 2];
          data[i + 3] = data[i + 3];
        } else {
          let NewPixel = nearbyPixel(x, y, ctx)
          data[i] = NewPixel[0];
          data[i + 1] = NewPixel[1];
          data[i + 2] = NewPixel[2];
          data[i + 3] = NewPixel[3];
        }
      }
  
      ctx.putImageData(imageData, 0, 0);
    };}