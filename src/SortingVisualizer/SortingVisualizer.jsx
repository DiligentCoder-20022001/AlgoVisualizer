import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/mergeSort.js';
import {getBubbleSortAnimations} from '../sortingAlgorithms/bubbleSort.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 300;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'blue';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'green';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {

            // if height is less than 5 we cant see it on the screen
            //duplicate values are allowed
            array.push(randomIntFromInterval(5, 700));
        }
        this.setState({ array });
    }

    bubbleSort()
    {
        const animations = getBubbleSortAnimations(this.state.array);
        for(let i = 0; i < animations.length; i++)
        {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 4;
            if(isColorChange == 0 || isColorChange == 1)
            {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i%4 === 0 ? 'red':'rgb(15, 211, 90)';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i*ANIMATION_SPEED_MS);
            }
            else
            {
                setTimeout(() => {
                    //const tempHeight = barOneStyle.height;
                    //barOneStyle.height = barTwoStyle.height;
                    //barTwoStyle.height = tempHeight;
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                },  i*ANIMATION_SPEED_MS); 
            }
        }
    }

    mergeSort(){
        
        /*const javascriptSortedArray = this.state.array.slice().sort((a,b) => a-b);
        const sortedArray = sortingAlgorithms.mergeSort(this.state.array);
        console.log(arraysAreEqual(javascriptSortedArray,sortedArray));*/
        //const animations = sortingAlgorithms.mergeSort(this.state.array);
        /*for(let i = 0; i < animations.length; i++)
        {
            const {comparision, swap} = animations[i];
            setTimeout(() => {
                const arrayBars = document.getElementsByClassName('array-bar');
                arrayBars[comparision[1]].style.backgroundColor = 'red';
                arrayBars[comparision[0]].style.backgroundColor = 'red';
                setTimeout(() => {
                    //arrayBars[comparision[1]].style.backgroundColor = 'rgb(15, 211, 90)';
                    //arrayBars[comparision[0]].style.backgroundColor = 'rgb(15, 211, 90)';
                }, (i+1)*10);
            }, i*10);
        }*/
        const animations = getMergeSortAnimations(this.state.array);
        //const newAnimations = [];
        //iterate through animations
        //we push comparision twice
        /*for(const animation of animations){
            newAnimations.push(animation.comparision);
            newAnimations.push(animation.comparision);
            newAnimations.push(animation.swap);
        }*/
        for(let i = 0; i < animations.length; i++)
        {
            const arrayBars = document.getElementsByClassName('array-bar');
            //const [barOneIdx, barTwoIdx] = newAnimations[i];
            //const barOneStyle = arrayBars[barOneIdx].style;
            //const barTwoStyle = arrayBars[barTwoIdx].style;
            //we use index % 3 because every 3 values we will have a new comparision
            //1st triplet -> comparision
            //2nd triplet -> reverting their colour
            //3rd triplet -> swapping
            
            const isColorChange  = i%3 !== 2;
            //if it is 2 then override else color change
            if(isColorChange){
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i%3 === 0 ? 'red':'rgb(15, 211, 90)';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i*ANIMATION_SPEED_MS);
            }
            else //overriding -> assigning a new height
            {
                setTimeout(() => {
                    //const tempHeight = barOneStyle.height;
                    //barOneStyle.height = barTwoStyle.height;
                    //barTwoStyle.height = tempHeight;
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                },  i*ANIMATION_SPEED_MS);
            }
        }
    }

    //this is for testing the algorithms 
    testSortingAlgorithms(){
        //it iterates for 0 to 100 and create arrays of random lengths from 1 to 1000
        
        for(let i = 0; i < 100;  i++)
        {
            const array = [];
            const length = randomIntFromInterval(1,1000);
            for(let i = 0; i < length; i++)
            {
                array.push(randomIntFromInterval(-1000,1000));
            }
            const javascriptSortedArray  =  array.slice().sort((a,b) => a-b);
            const mergeSortedArray = getMergeSortAnimations(array.slice());
            console.log(arraysAreEqual(javascriptSortedArray,mergeSortedArray));
        }
    }
    render() {
        const { array } = this.state;
        //maps the arrays to the bars
        return (
            <div>
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        //adjusting the height with the array value
                        style = {{height : `${value}px`}}
                    ></div>
                ))}
                 
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) {
        return false;
    }
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) {
            return false;
        }
    }
    return true;
}
