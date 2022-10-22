import { Form, Field, Formik, FormikProps } from "formik";
import { useState } from "react";
import styled from "styled-components";

const ResultContainer = styled.div``;

const HorizontalLine = styled.hr`
  width: 100%;
  margin: 1rem 0;
`;

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const VerticalForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > * {
    margin-bottom: 1rem;
  }
`;

const ResultRate = styled.div`
  font-size: 1.5rem;
  color: #666;
`;

const Input = styled(Field)`
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const SubmitButton = styled.button`
  margin-left: auto;
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: #0069d9;
    border-color: #0062cc;
  }
`;

export const CalculationForm = () => {
  const [resultRate, setResultRate] = useState<number | null>(null);

  return (
    <Formik
      initialValues={{ hourlyRate: "", paidVacationDays: "" }}
      onSubmit={(values: any, actions: any) => {
        console.log(values);
        setResultRate(100);
      }}
    >
      {(props: FormikProps<any>) => {
        return (
          <VerticalContainer>
            <VerticalForm>
              <Input type="text" name="hourlyRate" placeholder="Hourly rate" />
              <Input type="text" name="paidVacationDays" placeholder="Paid vacation days" />
              {/* <Field type="text" name="paidVacationDays" placeholder="Paid vacation days" /> */}
              <SubmitButton type="submit">Calculate</SubmitButton>
            </VerticalForm>
            {resultRate && (
              <ResultContainer>
                <HorizontalLine />
                <ResultRate>Clean result rate: {resultRate}</ResultRate>
              </ResultContainer>
            )}
          </VerticalContainer>
        );
      }}
    </Formik>
  );
};
