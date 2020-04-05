import React from 'react';
import './SortingVisualizer.css';
import 
{   
    getMergeSortAnimation,
    getBubbleSortAnimations
} from '../SortingAlgorithms/SortingAlgorithms.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 100;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 10;//440;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

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
        for(let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
            // Create the array with random numbers between the given interval
            //array.push(randomIntFromIntervals(1,800));

            // Create the array with perfectly ascending numbers, very satisfying while sorting
            // Note: Need to shuffle the array afterwards.
            array.push(i + 1);
        }
        shuffle(array);

        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimation(this.state.array);
        for(let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if(isColorChange) {
                const [firstBarIdx, secondBarIdx] = animations[i];
                const firstBarStyle = arrayBars[firstBarIdx].style;
                const secondBarStyle = arrayBars[secondBarIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

                setTimeout(() => {
                    firstBarStyle.backgroundColor = color;
                    secondBarStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }

            else {
                setTimeout(() => {
                    const [firstBarIdx, newHeight] = animations[i];
                    const firstBarStyle = arrayBars[firstBarIdx].style;
                    firstBarStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort() {}

    heapSort() {}

    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);
        for(let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 4 === 0 || i % 4 === 1;
            if(isColorChange) {
                const [firstBarIdx, secondBarIdx] = animations[i];
                const firstBarStyle = arrayBars[firstBarIdx].style;
                const secondBarStyle = arrayBars[secondBarIdx].style;
                const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

                setTimeout(() => {
                    firstBarStyle.backgroundColor = color;
                    secondBarStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }

            else {
                setTimeout(() => {
                    const [firstBarIdx, newHeight] = animations[i];
                    const firstBarStyle = arrayBars[firstBarIdx].style;
                    firstBarStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{
                            backgroundColor: PRIMARY_COLOR,
                            height: `${value}px`,
                        }}>
                    </div>
                ))}
                <button onClick={() => this.resetArray()}>Generate New Array </button>
                <button onClick={() => this.mergeSort() }>Merge Sort </button>
                <button onClick={() => this.quickSort() }>Quick Sort</button>
                <button onClick={() => this.heapSort()  }>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            </div>
        );
    }
}

// Min, max bounds included
function randomIntFromIntervals(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }