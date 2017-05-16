using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;
using System.Text;
using System.Threading;
namespace TestApp
{
    class Program
    {
        static void Main(string[] args)
        {
            //mqtt
            if (client == null)
            {
                // create client instance 
                MQTT_BROKER_ADDRESS = "cloud.makestro.com";
                client = new MqttClient(MQTT_BROKER_ADDRESS);
                string clientId = Guid.NewGuid().ToString();
                client.Connect(clientId, "mifmasterz", "123qweasd");
                SubscribeMessage();

            }

            while (true)
            {

                Thread.Sleep(10000);
                var Pesan = Encoding.UTF8.GetBytes("DOOR_OPEN");
                client.Publish("mifmasterz/door/control", Pesan, MqttMsgBase.QOS_LEVEL_AT_MOST_ONCE, false);
            }
        }
        public static MqttClient client { set; get; }

        public static string MQTT_BROKER_ADDRESS
        {
            set; get;
        }

        static void SubscribeMessage()
        {

            // register to message received 

            client.MqttMsgPublishReceived += client_MqttMsgPublishReceived;

            client.Subscribe(new string[] { "mifmasterz/door/data", "mifmasterz/door/control" }, new byte[] { MqttMsgBase.QOS_LEVEL_AT_MOST_ONCE, MqttMsgBase.QOS_LEVEL_AT_MOST_ONCE });

        }





        static void client_MqttMsgPublishReceived(object sender, MqttMsgPublishEventArgs e)

        {

            string Pesan = Encoding.UTF8.GetString(e.Message);

            switch (e.Topic)

            {

                case "mifmasterz/door/data":


                    break;

                case "mifmasterz/door/control":

                    switch (Pesan)
                    {
                        case "DOOR_OPEN":

                            break;
                        case "DOOR_CLOSE":

                            break;
                    }
                    break;


            }
            Console.WriteLine("{0} - {1}", e.Topic, Pesan);
        }
    }
}
