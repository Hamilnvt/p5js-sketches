class Card
{
  constructor(id, player)
  {
    this.id = id;
    this.player = player;
  }

  play()
  {
    switch(this.id)
    {
      
    }
  }

  effect_lose(amount)
  {
    this.player.rubli -= amount;
  }

  effect_receive(amount, other)
  {
    this.player.rubli += amount;
    other.rubli -= amount;
  }

}
