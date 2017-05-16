using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Builder.Luis;
using Microsoft.Bot.Builder.Luis.Models;
using Microsoft.Bot.Connector;

namespace Bot_Luis
{
    [LuisModel("84e2c060-6969-412f-8a2f-cf2a80f30917", "9c5be3b5d02e4f64a744d8f929eb05ad")]
    [Serializable]
    public class SiKedulDialog : LuisDialog<object>
    {
        static MqttEngine _mqtt;
        public MqttEngine mqtt
        {
            get
            {
                if (_mqtt == null) _mqtt = new MqttEngine();
                return _mqtt;
            }
        }

        [LuisIntent("")]
        public async Task None(IDialogContext context, LuisResult result)
        {
            string message = $"Sorry I did not understand: " + string.Join(", ", result.Intents.Select(i => i.Intent));
            await context.PostAsync(message);
            context.Wait(MessageReceived);
        }
        [LuisIntent("find.food")]
        public async Task FindFood(IDialogContext context, LuisResult result)
        {
            EntityRecommendation title;
            if (result.TryFindEntity("foodcategory", out title))
            {
                var selfood  = title.Entity;
                PromptDialog.Confirm(context, AfterConfirming_FoodSelect, $"Apakah Anda mencari makanan {selfood} ?", promptStyle: PromptStyle.None);
                context.UserData.SetValue<string>("SelFood",selfood);
                //await context.PostAsync();
            }
            else
            {
                await context.PostAsync("tidak ditemukan jenis makanan");
                context.Wait(MessageReceived);
            }
           

        }
        protected override async Task MessageReceived(IDialogContext context, IAwaitable<IMessageActivity> item)
        {
            _message = (Activity)await item;
            context.UserData.SetValue<Activity>("Activity", _message);
            await base.MessageReceived(context, item);
        }

        [field: NonSerialized()]
        private Activity _message;
        public async Task AfterConfirming_FoodSelect(IDialogContext context, IAwaitable<bool> confirmation)
        {
            if (await confirmation)
            {
                var selfood = string.Empty;
                context.UserData.TryGetValue<string>("SelFood", out selfood);
                var hasil = await BingImagesHelper.Search(selfood + " food");
                if (hasil != null)
                {
                    context.UserData.TryGetValue<Activity>("Activity",out _message);
                    ConnectorClient connector = new ConnectorClient(new Uri(_message.ServiceUrl));
                    Activity replyToConversation = _message.CreateReply($"Daftar Makanan {selfood}");
                    replyToConversation.Recipient = _message.From;
                    replyToConversation.Type = "message";
                    replyToConversation.Attachments = new List<Attachment>();
                    List<CardImage> cardImages = new List<CardImage>();

                    foreach (var x in hasil.value)
                    {
                        cardImages.Add(new CardImage(url: x.thumbnailUrl));
                    }
                  
                 
                    List<CardAction> cardButtons = new List<CardAction>();
                    CardAction plButton = new CardAction()
                    {
                        Value = $"https://www.google.co.id/?q={selfood}",
                        Type = "openUrl",
                        Title = "Cari"
                    };
                    cardButtons.Add(plButton);
                    HeroCard plCard = new HeroCard()
                    {
                        Title = $"Makanan {selfood}",
                        Subtitle = "Cari lebih lanjut...",
                        Images = cardImages,
                        Buttons = cardButtons
                    };
                    Attachment plAttachment = plCard.ToAttachment();
                    replyToConversation.Attachments.Add(plAttachment);
                    var reply = await connector.Conversations.SendToConversationAsync(replyToConversation);
                }
              
                //await context.PostAsync($"Ok, mencari makanan {selfood}");
            }
            else
            {
                await context.PostAsync("Ok! tidak jadi mencari makanan!");
            }
            context.Wait(MessageReceived);
        }
        [LuisIntent("find.image")]
        public async Task FindImage(IDialogContext context, LuisResult result)
        {
            EntityRecommendation title;
            if (result.TryFindEntity("pictureobject", out title))
            {
                var selImg = title.Entity;
                var hasil = await BingImagesHelper.Search(selImg);
                if (hasil != null)
                {
                    context.UserData.TryGetValue<Activity>("Activity", out _message);
                    ConnectorClient connector = new ConnectorClient(new Uri(_message.ServiceUrl));
                    Activity replyToConversation = _message.CreateReply($"Gambar: {selImg}");
                    replyToConversation.Recipient = _message.From;
                    replyToConversation.Type = "message";
                    replyToConversation.Attachments = new List<Attachment>();
                    List<CardImage> cardImages = new List<CardImage>();

                    foreach (var x in hasil.value)
                    {
                        cardImages.Add(new CardImage(url: x.thumbnailUrl));
                    }
                  
                    List<CardAction> cardButtons = new List<CardAction>();
                   
                    CardAction plButton = new CardAction()
                    {
                        Value = $"https://www.google.co.id/?q={selImg}",
                        Type = "openUrl",
                        Title = "Cari"
                    };
                    cardButtons.Add(plButton);
                    ThumbnailCard plCard = new ThumbnailCard()
                    {
                        Title = $"Hasil pencarian {selImg}",
                        Subtitle = "Cari lebih lanjut..",
                        Images = cardImages,
                        Buttons = cardButtons
                    };
                    Attachment plAttachment = plCard.ToAttachment();
                    replyToConversation.Attachments.Add(plAttachment);
                    var reply = await connector.Conversations.SendToConversationAsync(replyToConversation);
                }

                //await context.PostAsync($"Mencari gambar {selImg}");
            }
            else
            {
                await context.PostAsync("tidak ditemukan jenis gambar");
            }
            context.Wait(MessageReceived);

        }
        [LuisIntent("control.light")]
        public async Task ControlLight(IDialogContext context, LuisResult result)
        {
            EntityRecommendation title;
            string room=null, state=null;
            if (result.TryFindEntity("room", out title))
            {
                room = title.Entity;
            }

            if (result.TryFindEntity("state", out title))
            {
                state = title.Entity;
            }

            if(!string.IsNullOrEmpty(room) && !string.IsNullOrEmpty(state))
            {
                await context.PostAsync($"Light is switch to {state} in {room}");
                mqtt.SendMessage("LIGHT_"+state.ToUpper());
            }
            else
            {
                await context.PostAsync("perintah tidak dikenal");
            }
            context.Wait(MessageReceived);

        }
    }
}