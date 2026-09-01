 /** 
 *
 * @param {*} image
 */
exports.getNDVI = function (image) {

	var exp = '( b("nir") - b("red") ) / ( b("nir") + b("red") )';

	var ndvi = image.expression(exp).rename("ndvi")
		.multiply(100)
		.byte();

	return image.addBands(ndvi);
};

/**
 * 
 * @param {*} image 
 */
exports.getNDWI = function (image) {

	var exp = 'float(b("nir") - b("swir1"))/(b("nir") + b("swir1"))';

	var ndwi = image.expression(exp).rename("ndwi")
		.multiply(100)
		.byte();

	return image.addBands(ndwi);
};

/**
 *
 * @param {*} image
 */
exports.getSAVI = function (image) {

	var exp = '1.5 * (b("nir") - b("red")) / (0.5 + b("nir") + b("red"))';

	var savi = image.expression(exp).rename("savi")
		.multiply(100)
		.byte();

	return image.addBands(savi);
};

/**
 *
 * @param {*} image
 */
exports.getPRI = function (image) {

	var exp = 'float(b("blue") - b("green"))/(b("blue") + b("green"))';

	var pri = image.expression(exp).rename("pri")
		.multiply(100)
		.byte();

	return image.addBands(pri);
};

/**
 *
 * @param {*} image
 */
exports.getCAI = function (image) {

	var exp = 'float( b("swir2") / b("swir1") )';

	var cai = image.expression(exp).rename("cai")
		.multiply(100)
		.byte();

	return image.addBands(cai);
};

/**
 *
 * @param {*} image
 */
exports.getEVI = function (image) {

	var exp = '2.5 * ((b("nir") - b("red")) / (b("nir") + 6 * b("red") - 7.5 * b("blue") + 1))';

	var evi = image.expression(exp).rename("evi")
		.multiply(100)
		.byte();

	return image.addBands(evi);

};

/**
 *
 * @param {*} image
 */
exports.getEVI2 = function (image) {

	var exp = '2.5 * (b("nir") - b("red")) / (b("nir") + (2.4 * b("red")) + 1)';

	var evi2 = image.expression(exp).rename("evi2")
		.multiply(100)
		.byte();

	return image.addBands(evi2);
};

/**
 *
 * @param {*} image
 */
exports.getHallCover = function (image) {

	var exp = '( (-b("red") * 0.017) - (b("nir") * 0.007) - (b("swir2") * 0.079) + 5.22 )';

	var hallcover = image.expression(exp).rename("hallcover")
		.multiply(100);

	return image.addBands(hallcover);
};

/**
 *
 * @param {*} image
 */
exports.getHallHeigth = function (image) {

	var exp = '( (-b("red") * 0.039) - (b("nir") * 0.011) - (b("swir1") * 0.026) + 4.13 )';

	var hallheigth = image.expression(exp).rename("hallheigth")
		.multiply(100);

	return image.addBands(hallheigth);
};

/**
 *
 * @param {*} image
 */
exports.getGCVI = function (image) {

	var exp = 'b("nir") / b("green") - 1';

	var gcvi = image.expression(exp).rename("gcvi")
		.multiply(100)
		.byte();

	return image.addBands(gcvi);
};


/**
 *
 * @param {*} image
 */
exports.getNDSI = function (image) {

	var exp = '( b("green") - b("swir1") ) / ( b("green") + b("swir1") )';

	var ndsi = image.expression(exp).rename("ndsi")
		.multiply(100).add(100)
		.byte();

	return image.addBands(ndsi);
};

/**
 *
 * @param {*} image
 */
exports.getNDWImf= function (image) {

	var exp = '( b("green") - b("nir") ) / ( b("green") + b("nir") )';

	var ndwimf = image.expression(exp).rename("ndwimf")
		.multiply(100).add(100)
		.byte();

	return image.addBands(ndwimf);
};

// Calculo de indices
// Índices de Vegetación:
        // getNDVI(): Índice de Vegetación de Diferencia Normalizada
    // getSAVI(): Índice de Vegetación Ajustado al Suelo
    // getEVI(): Índice de Vegetación Mejorado
    // getEVI2(): Índice de Vegetación Mejorado 2
    // getGCVI(): Índice de Vegetación de Clorofila Verde

// Índices de Agua:
    // getNDWI(): Índice Normalizado de Diferencia de Agua
    // getNDSI(): Índice Normalizado de Diferencia de Nieve
    // getNDWImf(): Índice Normalizado de Diferencia de Agua (modificado)

// Otros Índices:
    // getPRI(): Índice de Reflectancia Fotoquímica
    // getCAI(): Índice de Absorción de Celulosa
    // getHallCover(): Cobertura de Hall (índice personalizado)
    // getHallHeigth(): Altura de Hall (índice personalizado)
    
// Patrón de la funcion
    // Recibe una imagen como entrada
    // Define una expresión matemática usando proporciones de bandas o transformaciones
    // Calcula el índice
    // Multiplica por 100 y convierte a byte (para escalar)
    // Añade el índice calculado como una nueva banda a la imagen original