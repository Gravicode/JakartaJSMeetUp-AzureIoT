using Microsoft.Bot.Builder.FormFlow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Connector;
using System.Threading.Tasks;

using Microsoft.Bot.Builder.FormFlow.Advanced;
using Microsoft.Bot.Builder.Resource;
using System.Resources;
using System.Text;
using System.Threading;
#pragma warning disable 649

namespace TokoBot
{

    public enum MCUBoard
    {
        [Terms("arduino","ino")]
        Arduino=1,
        RaspberryPi, Gadgeteer, CHIP
    }
    [Serializable]
    //[Template(TemplateUsage.NotUnderstood, "Ane ga paham \"{0}\".", "Coba lagi ya, ane tidak dapat nilai \"{0}\".")]
    public class TokoOrder
    {
        public string NoOrder;
        [Prompt("Siapa namanya bos ? {||}")]
        public string Nama;
        [Prompt("Boleh minta alamatnya ? {||}")]
        public string Alamat;

        [Prompt("Berapa no telponnya ? {||}")]
        public string Telpon;
        [Prompt("Emailnya boleh dunk? {||}")]
        public string Email;
        [Prompt("Pilih Dev Board yang bos suka? {||}")]
        public MCUBoard Pesanan;

        [Describe("Mo beli berapa bos")]
        [Numeric(1, 100)]
        public int Jumlah = 1;
        public double TotalBiaya;
        public static IForm<TokoOrder> BuildForm()
        {
            SampleData datas = new TokoBot.SampleData();

            OnCompletionAsyncDelegate<TokoOrder> processOrder = async (context, state) =>
            {
                await Task.Run(() => Console.WriteLine("Masukan data ke database"));
                //await context.PostAsync("We are currently processing your sandwich. We will message you the status.");
            };
            var builder = new FormBuilder<TokoOrder>(false);
            var form = builder
                    .Message("Welcome to toko mikon!")
                        .Field(nameof(Nama))
                        .Field(nameof(Alamat))
                        .Field(nameof(Telpon))
                        .Field(nameof(Email))
                        .Field(nameof(Pesanan))
                        .Field(nameof(Jumlah), validate:
                            async (state, value) =>
                            {
                                var result = new ValidateResult { IsValid = true, Value = value, Feedback = "barang tersedia" };
                                var jml =int.Parse( value.ToString());
                                var stok = datas.StockBarang[state.Pesanan];
                                if (jml <= 0)
                                {
                                    result.Feedback = $"Serius dulu lah bos belanjanya, masa beli sejumlah {jml} ?";
                                    result.IsValid = false;
                                }
                                else
                                if (jml > stok)
                                {
                                    result.Feedback = $"Board {state.Pesanan} stoknya hanya tinggal {stok} buah";
                                    result.IsValid = false;
                                    //result.Value = 0;
                                }
                                return result;


                            })
                        .Confirm(async (state) =>
                        {
                            var pesan = $"Pesanan bos {state.Nama} adalah {state.Jumlah} buah board {state.Pesanan}. ok bos ?";
                            return new PromptAttribute(pesan);
                        })
                        .Message("Makasih dah beli disini yah, order segera diproses!")
                        .OnCompletion(processOrder)
                        .Build();
            return form;
        }
    }


}