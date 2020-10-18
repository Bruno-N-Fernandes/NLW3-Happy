import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";

import OrphanageValidator from "../validators/OrphanageValidator";
import OrphanageView from "../views/OrphanageView";


export default {
	async index(request: Request, response: Response) {
		const orphanageRepository = getRepository(Orphanage);
		const orphanages = await orphanageRepository.find({ relations: ['images'] });
		return response.json(OrphanageView.renderMany(orphanages));
	},

	async show(request: Request, response: Response) {
		const orphanageRepository = getRepository(Orphanage);
		const orphanage = await orphanageRepository.findOneOrFail(request.params.id, { relations: ['images'] });
		return response.json(OrphanageView.render(orphanage));
	},

	async create(request: Request, response: Response) {
		const orphanageJson = request.body;
		const uploadedImages = request.files as Express.Multer.File[];
		orphanageJson.images = uploadedImages.map(image => { return { path: image.filename } });

		await OrphanageValidator(orphanageJson);

		const orphanageRepository = getRepository(Orphanage);
		const orphanage = orphanageRepository.create(orphanageJson);
		await orphanageRepository.save(orphanage);

		return response.status(201).json(orphanage);
	},

	async update(request: Request, response: Response) {
		const orphanageJson = request.body;
		const orphanageRepository = getRepository(Orphanage);
		const orphanage = await orphanageRepository.findOneOrFail(orphanageJson.id);
		return response.json(orphanage);
	},

	async delete(request: Request, response: Response) {
		const orphanageRepository = getRepository(Orphanage);
		const orphanages = await orphanageRepository.delete(request.params.id);
		return response.json(orphanages);
	},
};