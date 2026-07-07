/** 
 *
 */
 
// Funcion getSlope
// Obtiene información de pendiente desde el modelo digital de elevación ALOS PALSAR
// Procedimiento
    // Carga imagen de elevación global
    // Calcula pendiente
    // Multiplica por 100 para mayor precisión
    // Convierte a entero de 16 bits
    // Agrega banda de pendiente a la imagen original
    
exports.getSlope = function (image) {

    var terrain = ee.Image("JAXA/ALOS/AW3D30_V1_1").select("AVE");

    var slope = ee.Terrain.slope(terrain)
    // Reescalado; 15° = 1500
        .multiply(100)
        .int16()
        .rename('slope');

    return image.addBands(slope);
};

/**
 * 
 */
// Funcion getEntropyG()
// Calcula textura de la banda verde mediante entropía
// Procedimiento
    // Crea kernel cuadrado de radio 5
    // Selecciona banda verde mediana
    // Calcula entropía usando kernel
    // Multiplica por 100
    // Renombra banda como "green_median_texture"
    // Agrega nueva banda a imagen original
exports.getEntropyG = function (image) {

    var square = ee.Kernel.square({ radius: 5 });

    var entropyG = image.select('green_median')
        .int32()
        // .divide(10000)
        .entropy(square)
        .multiply(100)
        .rename("green_median_texture");

    return image.addBands(entropyG);
};