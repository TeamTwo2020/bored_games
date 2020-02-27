function clearCanvas(mycanvas)
{
    var cxt=document.getElementById(myCanvas).getContext("2d");
    cxt.clearRect(0,0,c.width,c.height);
}