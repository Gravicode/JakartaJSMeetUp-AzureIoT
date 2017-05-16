using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;
using System.Diagnostics;
namespace ConsoleApplication1
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
            Thread.Sleep(Timeout.Infinite);
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

            client.Subscribe(new string[] { "mifmasterz/assistant/data", "mifmasterz/assistant/control" }, new byte[] { MqttMsgBase.QOS_LEVEL_AT_MOST_ONCE, MqttMsgBase.QOS_LEVEL_AT_MOST_ONCE });

        }

        static void client_MqttMsgPublishReceived(object sender, MqttMsgPublishEventArgs e)

        {

            string Pesan = Encoding.UTF8.GetString(e.Message);

            switch (e.Topic)

            {

                case "mifmasterz/assistant/data":


                    break;

                case "mifmasterz/assistant/control":

                    switch (Pesan)
                    {
                        case "LIGHT_ON":

                            break;
                        case "LIGHT_OFF":

                            break;
                    }
                    break;


            }
            Debug.WriteLine(e.Topic + ":" + Pesan);
        }
    }
}
