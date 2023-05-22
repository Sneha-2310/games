var numSelected=null;
var tileSelected=null;
var errors=0;
var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]
var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"  
]

window.onload=function(){
    setGame();
}
function setGame(){
    for(let i=1;i<=9;i++){
        let number=document.createElement("div");
        number.id=i;
        number.innerText=i;
        number.addEventListener("click",selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }
    for(let r=0;r<9;r++){
        for(let c=0;c<9;c++){
           let tile=document.createElement("div");
           tile.id=r.toString()+"-"+c.toString();
           if(board[r][c]!="-")
           {
           tile.innerText=board[r][c];
           tile.classList.add("tile-start");
        }
        if(r==2 || r==5){tile.classList.add("hr-line");}
        if(c==2 || c==5){tile.classList.add("vr-line");}

           tile.addEventListener("click",selectTile);
           tile.classList.add("tile");
           document.getElementById("board").append(tile);
        }
    }
    let sol=document.createElement("div");
        sol.id="solve";
        sol.innerText="SOLVE";
        sol.addEventListener("click",solveGame(board));
        sol.classList.add("solved");
        document.getElementById("solve").appendChild(sol);
}



function selectNumber(){
    if(numSelected!=null){
        numSelected.classList.remove("number-selected");
    }
   
    numSelected=this;
    numSelected.classList.add("number-selected");
    
}
function selectTile(){
    if(numSelected){
        if(this.innerText!="")return;
        let cordinates=this.id.split("-");
        let r=parseInt(cordinates[0]);
        let c=parseInt(cordinates[1]);

        if(solution[r][c]==numSelected.id)
        {this.innerText=numSelected.id;}
            else{
               errors+=1;
               document.getElementById("errors").innerText=errors;     
            }
    }
}



function solve(){
    // for(let r=0;r<9;r++){
    //     for(let c=0;c<9;c++){

        //    let tile=document.getElementById(r.toString()+"-"+c.toString());           
        //    tile.innerText=solution[r][c];

        //    tile.classList.add("tile-start");   

    }
    function isValid(board, row, col, k) {
        for (let i = 0; i < 9; i++) {
            const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const n = 3 * Math.floor(col / 3) + i % 3;
            if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
              return false;
            }
        }
        return true;
    }
    
    
    function solveGame(data) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let tile=document.getElementById(r.toString()+"-"+c.toString());           
        //   
          if (data[i][j] == '-') {
            for (let k = 1; k <= 9; k++) {
              if (isValid(data, i, j, k)) {
                data[i][j] = `${k}`;
                tile.innerText=data[i][j];
              if (sodokoSolver(data)) {
               return true;
              } else {
               data[i][j] = '-';
              }
             }
           }
           return false;
         }
       }
     }
     return true;
    }


 isValidSudoku(){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(board[i][j]!='.'){
                for(let r=0;r<9;r++){
                    if(i!=r && board[i][j]==board[r][j] || j!=r && board[i][j]==board[i][r])
                    return false;
                }
                let p=i-i%3;
                let q=j-j%3;
                for(let x=p;x<p+3;x++){
                for(let y=q;y<q+3;y++){
                    if(!(x==i && y==j))    if(board[x][y]==board[i][j])return false;
                    }
                }
            }
        }
    }
return true;}