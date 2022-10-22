import { Form, Field, Formik, FormikProps } from "formik";
import { useState } from "react";
import styled from "styled-components";

const ResultContainer = styled.div``;

const ResultExplanation = styled.div`
  font-size: 1rem;
  margin-top: 0.25rem;
  color: #666;
`;

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
  margin-top: 1rem;
  color: #666;
`;

const InputLabel = styled.div`
  font-size: 1.2rem;
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

  const getAmountOfDaysInCurrentYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    const isLeapYear = new Date(year, 1, 29).getMonth() === 1;
    return isLeapYear ? 366 : 365;
  };

  const getAmountOfSaturdaysAndSundaysInCurrentYear = () => {
    const amountOfDaysInCurrentYear = getAmountOfDaysInCurrentYear();
    let amountOfSaturdaysAndSundaysInCurrentYear = 0;
    for (let i = 0; i < amountOfDaysInCurrentYear; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const day = date.getDay();
      if (day === 0 || day === 6) {
        amountOfSaturdaysAndSundaysInCurrentYear++;
      }
    }
    return amountOfSaturdaysAndSundaysInCurrentYear;
  };

  const getWorkweekDaysInCurrentYear = () => {
    const amountOfDaysInCurrentYear = getAmountOfDaysInCurrentYear();
    const amountOfSaturdaysAndSundaysInCurrentYear = getAmountOfSaturdaysAndSundaysInCurrentYear();
    return amountOfDaysInCurrentYear - amountOfSaturdaysAndSundaysInCurrentYear;
  };

  const getAverageAmountOfPublicHolidaysInAYear = () => {
    return 7;
  };

  const getWorkDays = (plannedVacationDays: number, expectedSickLeaveDays: number) => {
    const workweekDaysInCurrentYear = getWorkweekDaysInCurrentYear();
    const averageAmountOfPublicHolidaysInAYear = getAverageAmountOfPublicHolidaysInAYear();
    return (
      workweekDaysInCurrentYear - averageAmountOfPublicHolidaysInAYear - plannedVacationDays - expectedSickLeaveDays
    );
  };

  const getPaidDays = (
    paidVacationDays: number,
    plannedVacationDays: number,
    paidSickLeaveDays: number,
    expectedSickLeaveDays: number
  ) => {
    const workDays = getWorkDays(plannedVacationDays, expectedSickLeaveDays);
    return paidVacationDays + paidSickLeaveDays + workDays;
  };

  const convertRateWithBenefitsToPayPerHourRate = (
    hourlyRate: number,
    paidVacationDays: number,
    plannedVacationDays: number,
    paidSickLeaveDays: number,
    expectedSickLeaveDays: number
  ) => {
    const workDays = getWorkDays(plannedVacationDays, expectedSickLeaveDays);
    const workHours = workDays * 8;
    const workHoursWithBenefits = workHours + paidVacationDays * 8 + paidSickLeaveDays * 8;
    return hourlyRate * (workHoursWithBenefits / workHours);
  };

  return (
    <Formik
      initialValues={{
        hourlyRate: 100,
        paidVacationDays: 0,
        paidSickLeaveDays: 0,
        plannedVacationDays: 26,
        expectedSickLeaveDays: 4,
      }}
      onSubmit={(values: any, actions: any) => {
        const resultRate = convertRateWithBenefitsToPayPerHourRate(
          values.hourlyRate,
          values.paidVacationDays,
          values.plannedVacationDays,
          values.paidSickLeaveDays,
          values.expectedSickLeaveDays
        );
        setResultRate(resultRate);
      }}
    >
      {(props: FormikProps<any>) => {
        return (
          <VerticalContainer>
            <VerticalForm>
              <InputLabel>Hourly rate</InputLabel>
              <Input type="text" name="hourlyRate" placeholder="Hourly rate" />
              <InputLabel>Paid vacation days</InputLabel>
              <Input type="text" name="paidVacationDays" placeholder="Paid vacation days" />
              <InputLabel>Planned vacation days</InputLabel>
              <Input type="text" name="plannedVacationDays" placeholder="Planned vacation days" />
              <InputLabel>Paid sick leave days</InputLabel>
              <Input type="text" name="paidSickLeaveDays" placeholder="Paid sick leave days" />
              <InputLabel>Expected sick leave days</InputLabel>
              <Input type="text" name="expectedSickLeaveDays" placeholder="Expected sick leave days" />
              <SubmitButton type="submit">Calculate</SubmitButton>
            </VerticalForm>
            {resultRate && (
              <ResultContainer>
                <HorizontalLine />
                <ResultExplanation>Days in current year {getAmountOfDaysInCurrentYear()}</ResultExplanation>
                <ResultExplanation>Workweek days in current year {getWorkweekDaysInCurrentYear()}</ResultExplanation>
                <ResultExplanation>
                  Average public holidays per year {getAverageAmountOfPublicHolidaysInAYear()}
                </ResultExplanation>
                <ResultExplanation>
                  You will work {getWorkDays(props.values.plannedVacationDays, props.values.expectedSickLeaveDays)} days
                  this year
                </ResultExplanation>
                <ResultExplanation>
                  You will be paid for:{" "}
                  {getPaidDays(
                    Number(props.values.paidVacationDays),
                    Number(props.values.plannedVacationDays),
                    Number(props.values.paidSickLeaveDays),
                    Number(props.values.expectedSickLeaveDays)
                  )}{" "}
                  days
                </ResultExplanation>
                <ResultRate>Equivalent rate without bonuses would be: {resultRate.toFixed(2)}</ResultRate>
              </ResultContainer>
            )}
          </VerticalContainer>
        );
      }}
    </Formik>
  );
};
