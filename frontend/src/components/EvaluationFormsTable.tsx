import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { EvaluationFormResponse } from "../type";
import { getInstructorUsername } from "../api/EvaluationFormApi";
import groupByEvaluator from "./groupByEvaluator";

type Order = "asc" | "desc";

const EvaluationFormsTable = ({ data }: { data: EvaluationFormResponse[] }) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] =
    useState<keyof EvaluationFormResponse>("course");
  const [usernames, setUsernames] = useState<{ [email: string]: string }>({});
  const [selectedForm, setSelectedForm] =
    useState<EvaluationFormResponse | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUsernames = async () => {
      const newUsernames: { [email: string]: string } = {};
      for (const form of data) {
        if (!usernames[form.evaluator.email]) {
          const username = await getInstructorUsername(form.evaluator.email);
          if (username) {
            newUsernames[form.evaluator.email] = username;
          }
        }
      }
      setUsernames((prev) => ({ ...prev, ...newUsernames }));
    };

    fetchUsernames();
  }, []);

  const handleRequestSort = (property: keyof EvaluationFormResponse) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleRowClick = (form: EvaluationFormResponse) => {
    setSelectedForm(form);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedForm(null);
  };

  const groupedData = groupByEvaluator(data);

  const getAnswerLabel = (questionText: string, answer: any) => {
    console.log(answer[0]);
    
    switch (true) {
      case questionText.toLowerCase().includes("volume"):
        switch (answer[0]) {
          case 1:
            return "Zero";
          case 2:
            return "One";
          case 3:
            return "Two";
          case 4:
            return "Three";
          case 5:
            return "Many";
          default:
            return answer;
        }
      default:
        switch (answer[0]) {
          case 1:
            return "Below average";
          case 2:
            return "Average";
          case 3:
            return "Good";
          case 4:
            return "Very good";
          case 5:
            return "Excellent";
          default:
            return answer;
        }
    }
  };

  return (
    <>
      <div style={{ display: "flex", overflowX: "auto", padding: "20px" }}>
        {Object.keys(groupedData).map((evaluatorEmail) => (
          <div key={evaluatorEmail} style={{ marginRight: "20px" }}>
            <Typography
              variant="h6"
              style={{ color: "black", marginBottom: "20px" }}
            >
              Evaluator: {usernames[evaluatorEmail] || "loading"}
            </Typography>
            <TableContainer component={Paper} style={{ minWidth: "600px" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "course"}
                        direction={orderBy === "course" ? order : "asc"}
                        onClick={() => handleRequestSort("course")}
                      >
                        Course
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "evaluatedTA"}
                        direction={orderBy === "evaluatedTA" ? order : "asc"}
                        onClick={() => handleRequestSort("evaluatedTA")}
                      >
                        Evaluated TA
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "semester"}
                        direction={orderBy === "semester" ? order : "asc"}
                        onClick={() => handleRequestSort("semester")}
                      >
                        Semester
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupedData[evaluatorEmail].map((form) => (
                    <TableRow
                      key={form._id}
                      onClick={() => handleRowClick(form)}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>{form.course}</TableCell>
                      <TableCell>{form.evaluatedTA.name}</TableCell>
                      <TableCell>{form.semester}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Form Details</DialogTitle>
        <DialogContent>
          {selectedForm && (
            <div>
              <Typography variant="h6">
                Evaluator:{" "}
                {usernames[selectedForm.evaluator.email] ||
                  selectedForm.evaluator.email}
              </Typography>
              <Typography variant="h6">
                Course: {selectedForm.course}
              </Typography>
              <Typography variant="h6">
                Evaluated TA: {selectedForm.evaluatedTA.name}
              </Typography>
              <Typography variant="h6">
                Semester: {selectedForm.semester}
              </Typography>
              <Typography variant="h6" style={{ marginTop: "20px" }}>
                Questions and Answers:
              </Typography>
              {selectedForm.questions.map((question) => {
                const answers = selectedForm.answers
                  .filter((a) => a.questionId === question._id)
                  .map((a) => getAnswerLabel(question.questionText, a.answer))
                  .join(", "); // Added space after comma
                return (
                  <div key={question._id} style={{ marginBottom: "15px" }}>
                    <Typography variant="body1">
                      <strong>Question:</strong> {question.questionText}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Answer:</strong> {answers}
                    </Typography>
                  </div>
                );
              })}

              {/* Add more details as needed */}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EvaluationFormsTable;
