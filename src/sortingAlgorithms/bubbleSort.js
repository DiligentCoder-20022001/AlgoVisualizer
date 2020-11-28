export function getBubbleSortAnimations(array){
    const animations = [];
    if(array.length <= 1) return array;
    const auxArray = array.slice();
    bubbleSortHelper(auxArray, animations);
    array = auxArray;
    return animations;
}

function swap(mainArray, i, j)
{
    let temp = mainArray[i];
    mainArray[i] = mainArray[j];
    mainArray[j] = temp;
}

function bubbleSortHelper(mainArray, animations)
{
    
    let n = mainArray.length;
    for(let i = 0; i < n-1; i++)
    {
        for(let j = 0; j < n-i-1; j++)
        {
            if(mainArray[j] > mainArray[j+1])
            {
                animations.push([i,j]);
                animations.push([i,j]);
                animations.push([j,mainArray[j+1]]);
                animations.push([j+1,mainArray[j]]);
                swap(mainArray,j,j+1);
            }
        }

    }
}
