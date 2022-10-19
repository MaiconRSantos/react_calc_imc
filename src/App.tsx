import { useState } from "react";
import { levels, calculateImc, Level } from "./helpers/imc";
import styles from "./App.module.css";
import poweredImage from "./assets/powered.png";
import { GridItem } from "./components/GridItem";
import leftArrow from "./assets/leftarrow.png"

export const App = () => {

  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculate = () => {
    if(heightField && weightField){
      setToShow(calculateImc(heightField, weightField))
    }else{
      alert("Por favor digite todos os campos.")
    }
  }

  const handleBackButton = () => {
    setToShow(null)
    setHeightField(0)
    setWeightField(0)
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage}></img>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>
            IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela
            Organização Mundial de Saúde para calcular o peso ideal de cada
            pessoa.
          </p>

          <input 
          disabled={toShow ? true : false}
          type="number" 
          placeholder="Digite sua altura. Ex: 1.5 (em metros)" 
          value={heightField > 0 ? heightField : ""}
          onChange={e => setHeightField(parseFloat(e.target.value))
          }
          />

          <input 
          disabled={toShow ? true : false}
          type="number" 
          placeholder="Digite seu peso. Ex: 75.5 (em Kilo)" 
          value={weightField > 0 ? weightField : ""}
          onChange={e => setWeightField(parseFloat(e.target.value))
          } 
          />

          <button 
          disabled={toShow ? true : false} 
          onClick={handleCalculate}>Calcular</button>

        </div>

        <div className={styles.rightSide}>

          {!toShow &&
          <div className={styles.grid}>
            {levels.map((item, key) => (
              <GridItem key={key} item={item} />
            ))}
          </div>
            }

            {
              toShow && 
              <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrow} alt="" width={25} />
              </div>
              <GridItem item={toShow}></GridItem>
              </div>
            }

        </div>

      </div>

    </div>
  );
};
