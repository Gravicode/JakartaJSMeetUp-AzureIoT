using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;
using GIS = GHIElectronics.UWP.Shields;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;
using System.Text;
using Windows.UI.Core;
using System.Threading.Tasks;
// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace DoorLockApp
{
    public sealed partial class MainPage : Page
    {
        private GIS.FEZHAT hat;
        private DispatcherTimer timer;
        private DispatcherTimer timer2;

        private bool next;
        private int i;

        public MainPage()
        {
            this.InitializeComponent();

            this.Setup();
        }

        private async void Setup()
        {
            MqttTxt.Text = "Init Hat";  
            this.hat = await GIS.FEZHAT.CreateAsync();

            this.hat.S1.SetLimits(500, 2400, 0, 180);
            this.hat.S2.SetLimits(500, 2400, 0, 180);
            this.timer2 = new DispatcherTimer();
            this.timer2.Interval = TimeSpan.FromSeconds(3);
            this.timer2.Tick += Timer2_Tick;
            this.timer = new DispatcherTimer();
            this.timer.Interval = TimeSpan.FromMilliseconds(100);
            this.timer.Tick += this.OnTick;
            this.timer.Start();
            this.hat.D2.Color = GIS.FEZHAT.Color.Black;
            this.hat.D3.Color = GIS.FEZHAT.Color.Black;
            MqttTxt.Text = "Init Mqtt";
            //mqtt
            if (client == null)
            {
                // create client instance 
                MQTT_BROKER_ADDRESS = "cloud.makestro.com";
                client = new MqttClient(MQTT_BROKER_ADDRESS);
                string clientId = Guid.NewGuid().ToString();
                client.Connect(clientId, "mifmasterz", "123qweasd");
                SubscribeMessage();
                MqttTxt.Text = "Mqtt ready";
            }

        }

        private void Timer2_Tick(object sender, object e)
        {
            timer2.Stop();
            var Pesan = Encoding.UTF8.GetBytes("DOOR_CLOSE");
            client.Publish("mifmasterz/door/control", Pesan, MqttMsgBase.QOS_LEVEL_AT_MOST_ONCE, false);
        }

        private void OnTick(object sender, object e)
        {
            double x, y, z;

            this.hat.GetAcceleration(out x, out y, out z);

            this.LightTextBox.Text = this.hat.GetLightLevel().ToString("P2");
            this.TempTextBox.Text = this.hat.GetTemperature().ToString("N2");
            this.AccelTextBox.Text = $"({x:N2}, {y:N2}, {z:N2})";
            this.Button18TextBox.Text = this.hat.IsDIO18Pressed().ToString();
            this.Button22TextBox.Text = this.hat.IsDIO22Pressed().ToString();
            this.AnalogTextBox.Text = this.hat.ReadAnalog(GIS.FEZHAT.AnalogPin.Ain1).ToString("N2");

            if ((this.i++ % 5) == 0)
            {
                this.LedsTextBox.Text = this.next.ToString();

                this.hat.DIO24On = this.next;
                //this.hat.D2.Color = this.next ? GIS.FEZHAT.Color.White : GIS.FEZHAT.Color.Black;
                //this.hat.D3.Color = this.next ? GIS.FEZHAT.Color.White : GIS.FEZHAT.Color.Black;

                this.hat.WriteDigital(GIS.FEZHAT.DigitalPin.DIO16, this.next);
                this.hat.WriteDigital(GIS.FEZHAT.DigitalPin.DIO26, this.next);

                this.hat.SetPwmDutyCycle(GIS.FEZHAT.PwmPin.Pwm5, this.next ? 1.0 : 0.0);
                this.hat.SetPwmDutyCycle(GIS.FEZHAT.PwmPin.Pwm6, this.next ? 1.0 : 0.0);
                this.hat.SetPwmDutyCycle(GIS.FEZHAT.PwmPin.Pwm7, this.next ? 1.0 : 0.0);
                this.hat.SetPwmDutyCycle(GIS.FEZHAT.PwmPin.Pwm11, this.next ? 1.0 : 0.0);
                this.hat.SetPwmDutyCycle(GIS.FEZHAT.PwmPin.Pwm12, this.next ? 1.0 : 0.0);

                this.next = !this.next;
            }

            if (this.hat.IsDIO18Pressed())
            {
                DoorBell();
            }

            if (this.hat.IsDIO22Pressed())
            {
                DoorBell();
            }
        }
        void DoorBell()
        {
            var Pesan = Encoding.UTF8.GetBytes("BELL");
            client.Publish("mifmasterz/door/control", Pesan, MqttMsgBase.QOS_LEVEL_AT_MOST_ONCE, false);
        }
        public MqttClient client { set; get; }

        public string MQTT_BROKER_ADDRESS
        {
            set; get;
        }

        void SubscribeMessage()
        {

            // register to message received 

            client.MqttMsgPublishReceived += client_MqttMsgPublishReceived;
            
            client.Subscribe(new string[] { "mifmasterz/door/data", "mifmasterz/door/control" }, new byte[] { MqttMsgBase.QOS_LEVEL_AT_MOST_ONCE, MqttMsgBase.QOS_LEVEL_AT_MOST_ONCE });
            
        }





        void client_MqttMsgPublishReceived(object sender, MqttMsgPublishEventArgs e)

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
                            this.hat.D2.Color =  GIS.FEZHAT.Color.Green;
                            this.hat.D3.Color =  GIS.FEZHAT.Color.Green;
                            this.hat.S1.Position = 180.0;
                            this.hat.S2.Position = 180.0;
                            AutoDoorLock();
                            break;
                        case "DOOR_CLOSE":
                            this.hat.D2.Color = GIS.FEZHAT.Color.Red;
                            this.hat.D3.Color = GIS.FEZHAT.Color.Red;
                            this.hat.S1.Position = 0.0;
                            this.hat.S2.Position = 0.0;
                            break;
                    }
                    break;
                    

            }
            UpdateMqttMessage(e.Topic, Pesan);
            
        }
        async Task AutoDoorLock()
        {
            await Dispatcher.RunAsync(CoreDispatcherPriority.Normal, async () =>
            {
                timer2.Start();
            });
        }

        async Task UpdateMqttMessage(string Topic, string Msg)
        {
            await Dispatcher.RunAsync(CoreDispatcherPriority.Normal, async () =>
            {
                MqttTxt.Text = "[" + Topic + "] : " + Msg;
            });
        }


    

       
    }

}
