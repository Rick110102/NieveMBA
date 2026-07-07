 /**
 * 
 * @param {*} image 
 * @param {*} endmembers 
 */
// Funcion getFractions() y getFractions2()
// Descomponne la superficie en fracciones
// Características
    // Usa método de desmezclado espectral (unmixing)
    // Identifica diferentes coberturas:
        // Vegetación verde (GV)
        // Vegetación no fotosintética (NPV)
        // Suelo
        // Nubes
        // Nieve (en getFractions2() con más detalle)
exports.getFractions = function (image) {
  // En el script de clasificación solo usamos getFractions de 5 endmembers. 
    var endmembers= [
        [119.0, 475.0, 169.0, 6250.0, 2399.0, 675.0], /*gv*/
        [1514.0, 1597.0, 1421.0, 3053.0, 7707.0, 1975.0], /*npv*/
        [1799.0, 2479.0, 3158.0, 5437.0, 7707.0, 6646.0], /*soil*/
        [4031.0, 8714.0, 7900.0, 8989.0, 7002.0, 6607.0], /*cloud*/
        [9599.1, 9648.5, 9942.6, 9041.6, 519.8, 527.2] /*snow*/
        // Valores altos en blue, green, red y nir y muy bajos en swir1 y 2
         ]

    var outBandNames = ['gv', 'npv', 'soil', 'cloud','snow'];
    
    // Aplicado directamente al mosaico y no a imágenes individuales----------
    var fractions = ee.Image(image)
        .select(['blue_median_wet', 'green_median_wet', 'red_median_wet', 'nir_median_wet', 'swir1_median_wet', 'swir2_median_wet'])
        .unmix(endmembers)
        .max(0)
        .multiply(100)
        .byte();

    fractions = fractions.rename(outBandNames);

    var summed = fractions.expression('b("gv") + b("npv") + b("soil") + b("snow")');

    var shade = summed
                  .subtract(100)
                  .abs()
                  .byte()
                  .rename("shade");

    image = image.addBands(fractions);
    image = image.addBands(shade);

    return image;
};

// Proceso:
// Selecciona bandas de temporada seca
// Aplica desmezclado con miembros finales predefinidos
// Calcula fracciones de cada cobertura
// Genera banda de sombra
// Agrega bandas a imagen original

exports.getFractions2 = function (image) {
  
    var endmembers= [
        [119.0, 475.0, 169.0, 6250.0, 2399.0, 675.0], /*gv*/
        [1514.0, 1597.0, 1421.0, 3053.0, 7707.0, 1975.0], /*npv*/
        [1799.0, 2479.0, 3158.0, 5437.0, 7707.0, 6646.0], /*soil*/
        [4031.0, 8714.0, 7900.0, 8989.0, 7002.0, 6607.0], /*cloud*/
        [16022.00,8704.08,9149.50,7926.17,924.93,644.73], /*snow accum*/ 
        [5718.66,4310.91,4328.19,3910.82,459.15,339.55] /*snow abla*/
         ]

    var outBandNames = ['gv', 'npv', 'soil', 'cloud','snow','snow2'];

    var fractions = ee.Image(image)
        .select(['blue_median_wet', 'green_median_wet', 'red_median_wet', 'nir_median_wet', 'swir1_median_wet', 'swir2_median_wet'])
        .unmix(endmembers)
        .max(0)
        .multiply(100)
        .byte();

    fractions = fractions.rename(outBandNames);

    var summed = fractions.expression('b("gv") + b("npv") + b("soil") + b("snow")+ b("snow2")');

    var shade = summed
                  .subtract(100)
                  .abs()
                  .byte()
                  .rename("shade");

    image = image.addBands(fractions);
    image = image.addBands(shade);

    return image;
};


// Diferencias entre getFractions() y getFractions2():
    // getFractions(): 5 miembros finales
    // getFractions2(): 6 miembros finales (2 tipos de nieve)
    
// Usos principales:
    // Análisis de cobertura terrestre
    // Detección de cambios
    // Caracterización de paisajes
    // Procesamiento de imágenes satelitales

// Beneficios:
    // Extracción de información espectral
    // Reducción de variabilidad temporal
    // Generación de productos derivados

// Consideraciones:
    // Requiere selección cuidadosa de miembros finales
    // Sensible a la calidad de las imágenes de entrada    
        