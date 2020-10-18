import Image from "../models/Image";

/**
 * https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/
 */

export default {
	render(image: Image) {
		return {
			id: image.id,
			url: `http://192.168.1.250:3333/uploads/${image.path}`
		};
	},

	renderMany(images: Image[]) {
		return images.map(this.render);
	},
}