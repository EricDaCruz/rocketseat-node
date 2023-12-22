import { Router } from "express";

const categoriesRoutes = Router();

interface ICategory {
    name: string;
    description: string;
}

const categories: ICategory[] = [];

categoriesRoutes.post("/categories", (request, response) => {
    const { name, description }: ICategory = request.body;

    categories.push({ name, description });

    return response.status(201).send();
});

export { categoriesRoutes };
