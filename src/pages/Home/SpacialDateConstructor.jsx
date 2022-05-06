import styled from "styled-components";
import { useState, useContext } from "react";
import { Context } from "../../context";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function SpacialDateConstructor() {
  const [context] = useContext(Context);
  const [dateTitle, setDateTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {context.coupleStatus === "accepted" ? (
        <div>
          <FormStyle onSubmit={submitHandler}>
            <div>
              <h4>Enter date title</h4>
              <input
                onChange={(e) => {
                  setDateTitle(e.target.value);
                }}
                type="text"
                value={dateTitle}
              />
            </div>
          </FormStyle>
          <DatePickerBlock>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                format="yyyy/MM/dd"
                label="Date"
                views={["year", "month", "date"]}
                inputVariant="outlined"
                value={selectedDate}
                onChange={setSelectedDate}
              />
            </MuiPickersUtilsProvider>
          </DatePickerBlock>
          <Button>
            <button
              onClick={() => {
                console.log(dateTitle + " " + selectedDate);
                let data = {
                  coupleId: context.coupleId,
                  title: dateTitle,
                  actionDate: selectedDate,
                  bgColorId: 0,
                };
                fetch("http://localhost:3001/api/date", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                }).then((res) => {
                  console.log("Request complete! response:", res);
                });
                setDateTitle("");
                setSelectedDate(new Date());
              }}
            >
              Create
            </button>
          </Button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

const FormStyle = styled.form`
  margin: 0rem 10rem;

  h4 {
    margin-bottom: 1rem;
    margin-top: 1rem;
    margin-left: 1rem;
  }

  div {
    width: 100%;
    position: relative;
  }

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1rem;
    color: white;
    padding: 1rem 3rem;
    border: none;
    border-radius: 1rem;
    outline: none;
    width: 100%;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: white;
  }
`;

const DatePickerBlock = styled.div`
  margin: 0rem 10rem;
  margin-top: 2rem;
`;

const Button = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0rem 10rem;

  button {
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    font-weight: 600;
    margin: 1rem;
  }
`;

export default SpacialDateConstructor;
