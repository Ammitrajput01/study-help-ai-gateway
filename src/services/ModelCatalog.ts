import {
  MODEL_DATABASE,
  type ModelInfo,
} from "../database/models";

export class ModelCatalog {

  static getAll(): ModelInfo[] {
    return Object.values(
      MODEL_DATABASE
    );
  }


  static getById(
    id: string
  ): ModelInfo | undefined {

    return MODEL_DATABASE[id];

  }


  static getByProvider(
    provider: string
  ): ModelInfo[] {

    return this.getAll().filter(
      model =>
        model.provider === provider
    );

  }


  static getCodingModels(): ModelInfo[] {

    return this.getAll().filter(
      model =>
        model.capabilities.coding
    );

  }


  static getReasoningModels(): ModelInfo[] {

    return this.getAll().filter(
      model =>
        model.capabilities.reasoning
    );

  }


  static getVisionModels(): ModelInfo[] {

    return this.getAll().filter(
      model =>
        model.capabilities.vision
    );

  }


  static getFastest(): ModelInfo[] {

    return this.getAll().sort(
      (a, b) =>
        b.speed - a.speed
    );

  }


  static getHighestQuality(): ModelInfo[] {

    return this.getAll().sort(
      (a, b) =>
        b.quality - a.quality
    );

  }


  static getCheapest(): ModelInfo[] {

    return this.getAll().sort(
      (a, b) =>
        a.cost - b.cost
    );

  }

}