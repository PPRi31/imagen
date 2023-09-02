const readline = require('readline');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Por favor, ingresa tu nombre: ', (nombre) => {
  // Validar que el nombre no sea más largo de 10 caracteres
  
  rl.question('Por favor, ingresa tu cédula (máximo 10 caracteres numéricos): ', (cedula) => {
    if (!(/^\d+$/.test(cedula)) || cedula.length > 10) {
      console.log('La cédula debe ser un número con un máximo de 10 dígitos.');
      rl.close();
      return;
    }

    // Crear un lienzo (canvas) con dimensiones adecuadas para la imagen
    const canvas = createCanvas(400, 200);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';  
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '20px Arial';  
    ctx.fillStyle = 'black';

    // Escribir el nombre y la cédula en la imagen
    ctx.fillText(`Nombre: ${nombre}`, 20, 50);
    ctx.fillText(`Cédula: ${cedula}`, 20, 100);

    // Guardar la imagen como archivo JPG
    const nombreArchivo = `${cedula}.jpg`;
    const stream = canvas.createJPEGStream({ quality: 0.95 });

    stream.pipe(fs.createWriteStream(nombreArchivo));

    console.log(`Imagen ${nombreArchivo} generada con éxito.`);
    rl.close();
  });
});
