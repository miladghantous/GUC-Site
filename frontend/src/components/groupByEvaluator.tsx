import { EvaluationFormResponse } from "../type";

const groupByEvaluator = (data: EvaluationFormResponse[]) => {
  return data.reduce((acc, form) => {
    const evaluator = form.evaluator.email;
    if (!acc[evaluator]) {
      acc[evaluator] = [];
    }
    acc[evaluator].push(form);
    return acc;
  }, {} as { [key: string]: EvaluationFormResponse[] });
};

//export
export default groupByEvaluator;