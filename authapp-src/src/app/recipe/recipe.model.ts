export class Recipe {
    id: number;
    title: string;
    description: string;
    image_url: string;
    cuisines: string;
    category: string;
    subcategory: string;
    microcategory: string;
    prep_time: string;
    cook_time: string;
    extra_time: string;
    ready_time: string;
    servings: string;
    private: boolean
    ingredients: any
    directions: any
  }