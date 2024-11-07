export type BreedType = {
  name: string;
  temperament: string;
  life_span: string;
};

export type ImageType = {
  id: string;
  url: string;
  breeds: BreedType[];
};
