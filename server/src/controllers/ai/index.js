import useHuggingFace, { GeminiAPI } from "../../utils/ai.utils.js";
import { customError, success } from "../../utils/response.utils.js";

export const chat = async (req, res) => {
  try {
    const { prompt } = req.params;

    if (!prompt) {
      return customError(res, 400, {}, "Prompt is required.");
    }

    const response = await useHuggingFace(prompt, process.env.HF_TOKEN);

    if (!response) {
      return customError(
        res,
        400,
        {},
        "No response recrived form hugging face.",
      );
    }

    return success(res, { response }, "Response received successfully.");
  } catch (error) {
    return customError(res, 500, {}, error.message, error);
  }
};


export const Gchat = async (req, res) => {
  try {
    const { prompt } = req.params;

    if (!prompt) {
      return customError(res, 400, {}, "Prompt is required.");
    }

    const response = await GeminiAPI(prompt)

    if (!response) {
      return customError(
        res,
        400,
        {},
        "No response recrived form hugging face.",
      );
    }

    return success(res, { response }, "Response received successfully.");
  } catch (error) {
    return customError(res, 500, {}, error.message, error);
  }
};
