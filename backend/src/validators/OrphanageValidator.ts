import * as Yup from 'yup';

export const OrphanageValidatorDef = Yup.object().shape({
	name: Yup.string().required().max(100),
	latitude: Yup.number().required(),
	longitude: Yup.number().required(),
	about: Yup.string().required().max(300),
	instructions: Yup.string().required(),
	opening_hours: Yup.string().required(),
	open_on_weekends: Yup.boolean().required(),
	images: Yup.array(
		Yup.object().shape({
			path: Yup.string().required().max(300)
		})
	)
});

export default async function OrphanageValidator(orphanage: any): Promise<any> {
	await OrphanageValidatorDef.validate(orphanage, { abortEarly: false });
	return OrphanageValidatorDef.cast(orphanage);
}
