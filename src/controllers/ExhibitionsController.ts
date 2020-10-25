import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Exhibition from '../models/Exhibition';
import exhibitionView from '../views/exhibitions_view';

export default {
  async index(req: Request, res: Response) {
    const exhibitionsRepository = getRepository(Exhibition);

    const exhibitions = await exhibitionsRepository.find({
      relations: ['images'],
    });

    return res.json(exhibitionView.renderMany(exhibitions));
  },
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const exhibitionsRepository = getRepository(Exhibition);

    const exhibition = await exhibitionsRepository.findOneOrFail(id, {
      relations: ['images'],
    });

    return res.json(exhibitionView.render(exhibition));
  },
  async create(req: Request, res: Response) {
    const exhibitionsRepository = getRepository(Exhibition);

    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    let { open_on_weekends } = req.body;
    open_on_weekends = open_on_weekends.toLowerCase() === 'true';

    await schema.validate(
      { ...req.body, open_on_weekends, images },
      { abortEarly: false }
    );

    const exhibition = exhibitionsRepository.create({
      ...req.body,
      open_on_weekends,
      images,
    });

    await exhibitionsRepository.save(exhibition);

    return res.status(201).json(exhibition);
  },
};
