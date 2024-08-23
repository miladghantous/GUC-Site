// import { getInstructorUserName } from "../api/EvaluationFormApi";
// import { useEffect, useState } from "react";
// import { InstructorResponse } from "../type";

// interface InstructorUserNameProps {
//   evaluationFormId: string;
// }

// const InstructorUserName: React.FC<InstructorUserNameProps> = ({
//   evaluationFormId,
// }) => {
//   const [instructor, setInstructor] = useState<InstructorResponse>({_id:"" ,username: "" , email: "" , password: "" });
//   useEffect(() => {
//     getInstructorUserName(evaluationFormId).then((response) => {
//       setInstructor(response);
//     });
//   }, [evaluationFormId]);
//   return <>{instructor.username}</>;
// };

// export default InstructorUserName;
