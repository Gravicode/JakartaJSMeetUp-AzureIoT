using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TokoBot;

namespace TokoBot
{
    public class SampleData
    {
        public Dictionary<MCUBoard, int> StockBarang = new Dictionary<MCUBoard, int>();

        public SampleData()
        {
            if (StockBarang.Count <= 0)
            {
                Random rnd = new Random(Environment.TickCount);
                StockBarang.Add(MCUBoard.Arduino, rnd.Next(1, 10));
                StockBarang.Add(MCUBoard.CHIP, rnd.Next(1, 10));
                StockBarang.Add(MCUBoard.Gadgeteer, rnd.Next(1, 10));
                StockBarang.Add(MCUBoard.RaspberryPi, rnd.Next(1, 10));


            }
        }
    }
}