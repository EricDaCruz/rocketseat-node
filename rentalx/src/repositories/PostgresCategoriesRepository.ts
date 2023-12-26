import { type Category } from "../model/Category";
import {
    type ICreateCategoryDTO,
    type ICategoriesRepository,
} from "./ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoriesRepository {
    findByName(name: string): Category {
        return null;
    }

    list(): Category[] {
        return null;
    }

    create({ name, description }: ICreateCategoryDTO): void {
        console.log(name, description);
    }
}

export { PostgresCategoriesRepository };
