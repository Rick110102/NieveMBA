/** 
 *  
 */
// Gestiona especificaciones de bandas y conversion de tipos de datos en imagenes satelitales
// bandsSpecifications
// Define las especificaciones de bandas para un proyecto especifico (mapbiomas-glacier)
// Cada banda tiene un nombre y un tipo de dato asociado
// Estas bandas incluyen
      // Medianas de bandas espectrales (blue, green, red, nir, swir1, swir2)
      // Medianas para temporadas secas y humedas
      // Indices espectrales (NDWI, NDSI)
      
// Todos los wet, fueron descomentados, uno de los últimos cambios para poder clasificar mosaicos en temporada húmeda
var bandsSpecifications = {
    'mapbiomas-glacier': [
        ["blue_median", "uint16"],
        ["blue_median_wet", "uint16"],
        ["blue_median_dry", "uint16"],
        // ["blue_min", "uint16"],
        // ["blue_stdDev", "uint32"],
        ["green_median", "uint16"],
        ["green_median_dry", "uint16"],
        ["green_median_wet", "uint16"],
        // ["green_median_texture", "int16"],
        ["green_min", "uint16"],
        // ["green_stdDev", "uint32"],
        ["red_median", "uint16"],
        ["red_median_dry", "uint16"],
        // ["red_min", "uint16"],
        ["red_median_wet", "uint16"],
        // ["red_stdDev", "uint32"],
        ["nir_median", "uint16"],
        ["nir_median_dry", "uint16"],
        ["nir_median_wet", "uint16"],
        // ["nir_min", "uint16"],
        // ["nir_stdDev", "uint32"],
        ["swir1_median", "uint16"],
        ["swir1_median_dry", "uint16"],
        ["swir1_median_wet", "uint16"],
        // ["swir1_min", "uint16"],
        // ["swir1_stdDev", "uint32"],
        ["swir2_median", "uint16"],
        ["swir2_median_wet", "uint16"],
        ["swir2_median_dry", "uint16"],
        // ["swir2_min", "uint16"],
        // ["swir2_stdDev", "uint32"],
        ["ndwimf_median", "uint8"],
        ["ndwimf_median_dry", "uint8"],
        ["ndwimf_median_wet", "uint8"],
        // ["ndwimf_amp", "uint8"],
        ["ndsi_median", "uint8"],
        ["ndsi_median_dry", "uint8"],
        ["ndsi_median_wet", "uint8"],
        ["ndsi_min", "uint8"],
        // ["ndsi_amp", "uint8"],
        // ["soil_median", "uint8"],
        // ["cloud_median", "uint8"],
        // ["shade_median", "uint8"],
        // ["slope", "int16"],
    ]
};

/*var bandsSpecifications = {
    'mapbiomas-glacier': [
        ["blue_median", "uint16"],
        ["blue_median_wet", "uint16"],
        ["blue_median_dry", "uint16"],
        ["blue_min", "uint16"],
        ["blue_stdDev", "uint32"],
        ["green_median", "uint16"],
        ["green_median_dry", "uint16"],
        ["green_median_wet", "uint16"],
        ["green_median_texture", "int16"],
        ["green_min", "uint16"],
        ["green_stdDev", "uint32"],
        ["red_median", "uint16"],
        ["red_median_dry", "uint16"],
        ["red_min", "uint16"],
        ["red_median_wet", "uint16"],
        ["red_stdDev", "uint32"],
        ["nir_median", "uint16"],
        ["nir_median_dry", "uint16"],
        ["nir_median_wet", "uint16"],
        ["nir_min", "uint16"],
        ["nir_stdDev", "uint32"],
        ["swir1_median", "uint16"],
        ["swir1_median_dry", "uint16"],
        ["swir1_median_wet", "uint16"],
        ["swir1_min", "uint16"],
        ["swir1_stdDev", "uint32"],
        ["swir2_median", "uint16"],
        ["swir2_median_wet", "uint16"],
        ["swir2_median_dry", "uint16"],
        ["swir2_min", "uint16"],
        ["swir2_stdDev", "uint32"],
        ["ndwimf_median", "uint8"],
        ["ndwimf_median_dry", "uint8"],
        ["ndwimf_median_wet", "uint8"],
        ["ndwimf_amp", "uint8"],
        ["ndsi_median", "uint8"],
        ["ndsi_median_dry", "uint8"],
        ["ndsi_median_wet", "uint8"],
        ["ndsi_min", "uint8"],
        ["ndsi_amp", "uint8"],
        ["soil_median", "uint8"],
        ["cloud_median", "uint8"],
        ["shade_median", "uint8"],
        // ["slope", "int16"],
    ]
};
*/
/**
 * 
 */

// Contiene funciones para convertir imágenes a diferentes tipos de datos
      // toUint8(): Convierte a entero sin signo de 8 bits
      // toUint16(): Convierte a entero sin signo de 16 bits
      // toUint32(): Convierte a entero sin signo de 32 bits
      // toInt16(): Convierte a entero con signo de 16 bits
var conversionFunctions = {

    "uint8": function (image) {
        return image.toUint8();
    },

    "uint16": function (image) {
        return image.toUint16();
    },

    "uint32": function (image) {
        return image.toUint32();
    },

    "int16": function (image) {
        return image.toInt16();
    },

};

/**
 * 
 * @param {*} image 
 */
 
// Funcion setBandTypes()
// Recibe una imagen y un nombre de proyecto
// Transforma el tipo de datos de las bandas según las especificaciones
      // Obtiene las especificaciones de bandas para el proyecto
      // Itera sobre cada especificación de banda
      // Selecciona la función de conversión correspondiente
      // Convierte la banda al tipo de dato especificado
      // Agrega la banda convertida a una nueva imagen
exports.setBandTypes = function (image, projectName) {


    var imageSpecifBands = bandsSpecifications[projectName]
        .reduce(
            function (imageSpecifBands, bandSpecification) {

                var fun = conversionFunctions[bandSpecification[1]];

                return imageSpecifBands.addBands(
                    fun(image.select([bandSpecification[0]])),
                    [bandSpecification[0]],
                    true
                );
            }, ee.Image().select()
        );

    return ee.Image(imageSpecifBands.copyProperties(image));
};

// Ejemplo de uso
// var image = ee.Image(...); // Tu imagen original
// var convertedImage = setBandTypes(image, 'mapbiomas-glacier');

// Características Importantes:
    // Flexibilidad para manejar diferentes tipos de datos
    // Conserva las propiedades originales de la imagen
    // Optimiza el almacenamiento y procesamiento de imágenes

// Utilidad:
    // Preparación de datos para análisis específicos
    // Estandarización de tipos de datos
    // Reducción de consumo de memoria

// Notas:
    // Actualmente configurado para el proyecto 'mapbiomas-glacier'