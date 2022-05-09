import styled from "styled-components";
import { useState, useContext } from "react";
import { Context } from "../../context";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function ComplimentConstructor() {
  const [context] = useContext(Context);
  const [complimentText, setComplimentText] = useState("");
  const [selectedDate, handleDateChange] = useState(new Date());

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(complimentText);
  };
  return (
    <div>
      {context.coupleStatus === "accepted" ? (
        <div>
          <FormStyle onSubmit={submitHandler}>
            <div>
              <h4>Enter compliment text</h4>
              <input
                onChange={(e) => {
                  setComplimentText(e.target.value);
                }}
                className="textInput"
                type="text"
                value={complimentText}
              />
            </div>
          </FormStyle>
          <DatePickerBlock>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                disablePast
                format="yyyy/MM/dd"
                label="Date to show"
                views={["year", "month", "date"]}
                inputVariant="outlined"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </DatePickerBlock>
          <Button>
            <button
              onClick={async () => {
                const sex = context.userSex === "male" ? "female" : "male";
                let data = {
                  coupleId: context.coupleId,
                  date: selectedDate,
                  text: complimentText,
                  recipent: sex,
                };

                fetch("http://localhost:3001/api/compliment", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                }).then((res) => {
                  console.log("Request complete! response:", res);
                });
                setComplimentText("");
              }}
            >
              Send
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
    margin-left: 1rem;
  }

  div {
    width: 100%;
    position: relative;
  }

  .textInput {
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

export default ComplimentConstructor;
