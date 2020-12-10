import Exhibition from '../models/Exhibition';

export default {
  render(exhibition: Exhibition) {
    return {
      id: exhibition.id,
      name: exhibition.name,
      latitude: exhibition.latitude,
      longitude: exhibition.longitude,
    };
  },
};
