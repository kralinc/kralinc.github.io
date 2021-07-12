//This could be generic in Java but because JS isn't object oriented I can't 
//  use some sort of comparable interface to compare objects
class TileMaxHeap {
	constructor () {
		this.heap = [];
		
	}
	
	add(item) {
		//Add item at the end of the heap and jump to its index
		this.heap.push(item);
		let index = this.heap.length - 1;
		
		while (index > 0) {
			let parentIndex = Math.floor((index - 1) / 2);
			
			//Swap if the current object is greater than its parent
			if (this.heap[index].value > this.heap[parentIndex].value) {
				let temp = this.heap[index];
				this.heap[index] = this.heap[parentIndex];
				this.heap[parentIndex] = temp;
			}else {
				break; //it is a this.heap
			}
			
			index = parentIndex;
		}
	}
	
	remove() {
		if (this.getSize() === 0) {
			return null;
		}
		
		let root = this.heap[0];
		this.heap[0] = this.heap[this.heap.length - 1];
		this.heap.pop();
		
		let index = 0;
		
		while (index < this.heap.length) 
		{
			let leftIndex = 2 * index + 1;
			let rightIndex = 2 * index + 2;
			
			if (leftIndex >= this.heap.length) {
				break; //it is a heap
			}
			
			let maxIndex = leftIndex;
			
			if (rightIndex < this.heap.length) {
				if (this.heap[maxIndex].value < this.heap[rightIndex].value) {
					maxIndex = rightIndex;
				}
			}
			
			if (this.heap[index].value < this.heap[maxIndex].value) {
				let temp = this.heap[maxIndex];
				this.heap[maxIndex] = this.heap[index];
				this.heap[index] = temp;
				
				index = maxIndex;
			}else {
				break; //it is a heap
			}
		}
		
		return root;
	}
	
	getSize() {
		return this.heap.length;
	}
}


//Used for debugging my heapsort
/*function TEMPTESTHEAP() {
	let heap = new TileMaxHeap();
	let inp = "";
	let outp = "";
	
	for (let i=0; i < 10; ++i) {
		let rand = Math.floor(Math.random() * 51);
		heap.add(new Tile(0,rand,null,0,0));
		inp += rand + " ";
	}
	console.log(inp);
	
	for (let i=0; i < 10; ++i) {
		let tol = heap.remove().value;
		outp += tol + " ";
	}
	
	console.log(outp);
	
}*/