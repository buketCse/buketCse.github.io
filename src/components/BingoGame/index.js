
import {useEffect, useState} from 'react'
import './bingo.css'
import {Button} from 'react-bootstrap'
import _ from 'lodash'
import {gameData} from './gameData.js'

const BingoGame = () =>{
    const matrixSize = 5;
    const [clickedItem, setClickedItem]= useState(null)
    const [bingoList, setBingoList] = useState([])
    const shuffledGameData= _.shuffle(gameData)
    const [isBingo, setIsBingo] = useState(false)
    
    useEffect(()=>{
        let counter=0;
        const newBingoList = []

        for(let k=0;k<matrixSize;k++){
            const newRow=[]
            for(let i=0;i<matrixSize; i++){
                newRow.push(shuffledGameData[counter])
                counter++
            }
            newBingoList.push(newRow)
        }    
        setBingoList(newBingoList)
    },[])

    useEffect(()=>{},[bingoList])

    useEffect(()=>{
        if(bingoList.length){
            let bingoListArr = bingoList
            for(let j=0;j<matrixSize; j++){
                const foundedIndex= _.findIndex(bingoListArr[j], item=>{return item.value=== clickedItem})
                if(foundedIndex>=0){
                    bingoListArr[j][foundedIndex].disabled= true
                }
            }
            setBingoList(bingoListArr)
            checkBingo()
        }
    },[bingoList, clickedItem])

    const handleClick = (e,item) =>{
        e.stopPropagation()
        setClickedItem(item.value)
    }

    const checkBingo = () =>{
        // find disabled ones to check bingo
    }

    return ( <div className='app-main'>
        <div className="bingo-header">
        <span>Welcome to Bingo App</span>
      </div>
      <div className="container">
        {isBingo ?
            <div>You Win The Game !</div>
         : bingoList.map((rows,i) => {
            return (<div key = {i} className="row">
            {rows.map((item,index)=>{
                 return (<Button 
                    disabled={(i===2 && index===2)? true : item.disabled} 
                    size="sm"
                    key={item.value}
                 value={item.value}
                 variant="primary"
                 type="button"
                 className="btn btn-primary column-item"
                 onClick={(e)=>{handleClick(e,item)}}> 
                 {(i===2 && index===2)? 'BINGO' : item.label}
               </Button>)
             })}
             </div>)
        })}
        </div>
        </div>)
    
}

export default BingoGame