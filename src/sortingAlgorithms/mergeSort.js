/*export const mergeSort = (array, animations = []) => {
    //we also need to keep track of the animations in the algorithm
    if(array.length === 1) return array;
    const mid = Math.floor(array.length/2);
    const first = mergeSort(array.slice(0, mid));
    const second = mergeSort(array.slice(mid));
    const sortedArray = [];
    let i = 0;
    let j = 0;
    while(i < first.length && j < second.length)
    {
        if(first[i] < second[j])
        {
            sortedArray.push(first[i]);
            i++;
        }
        else
        {
            sortedArray.push(second[j]);
            j++;
        }
    }
    while(i < first.length)
    {
        sortedArray.push(first[i]);
        i++;
    }
    while(j < second.length)
    {
        sortedArray.push(second[j]);
        j++;
    }
    return sortedArray;
}*/ 

export function getMergeSortAnimations(array){
    const animations = [];
    if(array.length <= 1) return array;
    const auxArray = array.slice();
    mergeSortHelper(array,0,array.length-1,auxArray,animations);
    return animations;
}

function mergeSortHelper(mainArray, startInd, endInd, auxArray, animations)
{
    if(startInd === endInd) return;
    const mid = Math.floor((startInd + endInd)/2);
    mergeSortHelper(auxArray,startInd,mid,mainArray,animations);
    mergeSortHelper(auxArray, mid+1, endInd, mainArray, animations);
    doMerge(mainArray, startInd, mid, endInd, auxArray,animations);
}

function doMerge(mainArray, startInd, mid, endInd, auxArray, animations)
{
    let k = startInd;
    let i = startInd;
    let j = mid + 1;
    while(i <= mid && j <= endInd)
    {
        //these will be the values in the array we will be comparing. Push them once to change their colour
        animations.push([i,j]);
        //we again push them to make them back to revert their colour 
        animations.push([i,j]);
        if(auxArray[i] <= auxArray[j])
        {
            //index at k gets overwritten with the value of index at i in the auxillary \
            animations.push([k,auxArray[i]]);
            mainArray[k] = auxArray[i];
            k++;
            i++;
        }
        else{
            //index at k similiarly gets overwritten with value at j
            animations.push([k,auxArray[j]]);
            mainArray[k] = auxArray[j];
            k++;
            j++;
        }
    }
    while(i <= mid)
    {
        //similiar to the ones explained pussh to comppare push again to revert back colour and finally push to overwrite at index k in the original array by the value in auxArr index i

        animations.push([i,i]);
        animations.push([i,i]);
        animations.push([k,auxArray[i]]);
        mainArray[k] = auxArray[i];
        k++;
        i++;
    }
    while(j <= endInd)
    {
        //similiar to the ones explained pussh to comppare push again to revert back colour and finally push to overwrite at index k in the original array by the value in auxArr index i
        
        animations.push([j,j]);
        animations.push([j,j]);
        animations.push([k,auxArray[j]]);
        mainArray[k] = auxArray[j];
        k++;
        j++;
    }
    
}
