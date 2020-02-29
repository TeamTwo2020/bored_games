function  generateHealthPack(ctx,situation)
{
    if(situation==0&&randomnum<=1&&numofHealthpack<2)
{
    {

        ctx.beginPath();
        ctx.fillStyle = 'green';

        ctx.fillRect(new_x, new_y, 20, 20);

    }
    if (testCollision(new_x, new_y, 20, 20, hero)) {
        hero.health = 60;
        situation = 1;
        numofHealthpack++;

    }
}

    if(situation==0&&randomnum<=2&&randomnum>1&&numofHealthpack<2)
    {
        {
            ctx.beginPath();
            ctx.fillStyle = 'yellow';

            ctx.fillRect(new_x1, new_y1, 20, 20);

            //situation=1;
        }
        if (testCollision(new_x1, new_y1, 20, 20, hero)) {
            hero.health = 60;
            situation = 1;
            numofHealthpack++;
        }
    }

}