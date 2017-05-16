using SharpDX.DirectInput;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;

namespace RCController
{
    class Program
    {
        public static MqttClient client { set; get; }
        public static string MQTT_BROKER_ADDRESS
        {
            get { return ConfigurationManager.AppSettings["MQTT_BROKER_ADDRESS"]; }
        }
        static void SubscribeMessage()
        {
            // register to message received 
            client.MqttMsgPublishReceived += client_MqttMsgPublishReceived;

            client.Subscribe(new string[] { "mifmasterz/robot/data", "mifmasterz/robot/control", "/robot/state" }, new byte[] { MqttMsgBase.QOS_LEVEL_AT_MOST_ONCE, MqttMsgBase.QOS_LEVEL_AT_MOST_ONCE, MqttMsgBase.QOS_LEVEL_AT_MOST_ONCE });

        }


        static void client_MqttMsgPublishReceived(object sender, MqttMsgPublishEventArgs e)
        {
            string Pesan = Encoding.UTF8.GetString(e.Message);
            switch (e.Topic)
            {
                case "mifmasterz/robot/data":
                    Console.WriteLine(Pesan);
                    break;
                case "mifmasterz/robot/control":
                    Console.WriteLine(Pesan);
                    break;
                case "/robot/state":
                    Console.WriteLine(Pesan);
                    break;
            }

        }
       

        public static void MoveRobot(string Cmd, string Direction)
        {
            string Pesan = Cmd + ":" + Direction;
            client.Publish("mifmasterz/robot/control", Encoding.UTF8.GetBytes(Pesan), MqttMsgBase.QOS_LEVEL_AT_MOST_ONCE, false);

        }
        static void Main(string[] args)
        {
            if (client == null)
            {
                // create client instance 
                client = new MqttClient(MQTT_BROKER_ADDRESS);

                string clientId = Guid.NewGuid().ToString();
                client.Connect(clientId, "mifmasterz", "123qweasd");

                SubscribeMessage();
            }
            // Initialize DirectInput

            var directInput = new DirectInput();

            // Find a Joystick Guid
            var joystickGuid = Guid.Empty;

            foreach (var deviceInstance in directInput.GetDevices(DeviceType.Gamepad,
                        DeviceEnumerationFlags.AllDevices))
                joystickGuid = deviceInstance.InstanceGuid;

            // If Gamepad not found, look for a Joystick
            if (joystickGuid == Guid.Empty)
                foreach (var deviceInstance in directInput.GetDevices(DeviceType.Joystick,
                        DeviceEnumerationFlags.AllDevices))
                    joystickGuid = deviceInstance.InstanceGuid;

            // If Joystick not found, throws an error
            if (joystickGuid == Guid.Empty)
            {
                Console.WriteLine("No joystick/Gamepad found.");
                Console.ReadKey();
                Environment.Exit(1);
            }

            // Instantiate the joystick
            var joystick = new Joystick(directInput, joystickGuid);

            Console.WriteLine("Found Joystick/Gamepad with GUID: {0}", joystickGuid);

            // Query all suported ForceFeedback effects
            var allEffects = joystick.GetEffects();
            foreach (var effectInfo in allEffects)
                Console.WriteLine("Effect available {0}", effectInfo.Name);

            // Set BufferSize in order to use buffered data.
            joystick.Properties.BufferSize = 128;

            // Acquire the joystick
            joystick.Acquire();
            const int stop = 32511;
            // Poll events from joystick
            while (true)
            {
                joystick.Poll();
                var datas = joystick.GetBufferedData();
                foreach (var state in datas)
                {
                    if (state.Offset.ToString() == "X" && state.Value > stop)
                    {
                        MoveRobot("MOVE", "R");
                        Console.WriteLine("Kanan");
                    }
                    else if(state.Offset.ToString() == "X" && state.Value < stop)
                    {
                        MoveRobot("MOVE", "L");

                        Console.WriteLine("Kiri");
                    }
                    else if (state.Offset.ToString() == "Y" && state.Value < stop)
                    {
                        MoveRobot("MOVE", "F");

                        Console.WriteLine("Maju");
                    }
                    else if (state.Offset.ToString() == "Y" && state.Value > stop)
                    {
                        MoveRobot("MOVE", "B");

                        Console.WriteLine("Mundur");
                    }
                    else
                    {
                        MoveRobot("MOVE", "S");

                        Console.WriteLine("Stop");
                    }

                }

            }
        }
    }
}
