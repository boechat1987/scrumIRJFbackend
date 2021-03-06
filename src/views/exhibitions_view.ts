import Exhibition from '../models/Exhibition';
import imagesView from './images_view';

export default {
  render(exhibition: Exhibition) {
    return {
      id: exhibition.id,
      name: exhibition.name,
      latitude: exhibition.latitude,
      longitude: exhibition.longitude,
      about: exhibition.about,
      instructions: exhibition.instructions,
      opening_hours: exhibition.opening_hours,
      category_of_art: exhibition.category_of_art,
      open_on_weekends: exhibition.open_on_weekends,
      telephone: exhibition.telephone,
      images: imagesView.renderMany(exhibition.images),
    };
  },

  renderMany(exhibitions: Exhibition[]) {
    return exhibitions.map((exhibition) => this.render(exhibition));
  },
};
