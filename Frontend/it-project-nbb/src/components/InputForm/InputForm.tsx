import { ChangeEventHandler, MouseEventHandler } from "react";
import styles from './InputForm.module.css';

interface InputFormProps {
    handleVatNumber1Change: ChangeEventHandler<HTMLInputElement>,
    handleVatNumber2Change: ChangeEventHandler<HTMLInputElement>,
    handleOnClick: MouseEventHandler<HTMLButtonElement>
  }  

const InputForm = ({ handleVatNumber1Change, handleVatNumber2Change, handleOnClick }: InputFormProps) => {
    return (
      <div className={styles.inputForm}>
        <input
          type="string"
          id="vatNumber1"
          name="vatNumber1"
          placeholder="Ondernemingsnummer 1"
          title="Gelieve een 10-cijferig ondernemingsnummer in te voeren."
          pattern="[0-9]{10}"
          onChange={handleVatNumber1Change}
          required
        />
        <input
          type="string"
          id="vatNumber2"
          name="vatNumber2"
          placeholder="Ondernemingsnummer 2"   
          title="Gelieve een 10-cijferig ondernemingsnummer in te voeren."       
          pattern="[0-9]{10}"
          onChange={handleVatNumber2Change}
          required
        />
        <button
          type="submit"
          onClick={handleOnClick}>
          Vergelijk
        </button>
      </div>
    );
  }

export default InputForm;