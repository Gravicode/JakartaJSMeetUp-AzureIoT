using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.Bot.Connector;
using Newtonsoft.Json;
using System.Web;

namespace BasicBot
{
    [BotAuthentication]
    public class MessagesController : ApiController
    {
        /// <summary>
        /// POST: api/Messages
        /// Receive a message from a user and reply to it
        /// </summary>
        public async Task<HttpResponseMessage> Post([FromBody]Activity activity)
        {
            if (activity.Type == ActivityTypes.Message)
            {
                ConnectorClient connector = new ConnectorClient(new Uri(activity.ServiceUrl));
                // calculate something for us to return
                int length = (activity.Text ?? string.Empty).Length;
                Activity reply = null;
                if (activity.Text.Contains("joke"))
                {
                    var jokes = await JokeHelper.GetJoke();
                    reply = activity.CreateReply(HttpUtility.UrlDecode(jokes.value.joke));
                    //await connector.Conversations.ReplyToActivityAsync(reply);

                }
                else if (activity.Text.Contains("surah"))
                {
                    int i = activity.Text.IndexOf("surah");
                    string CuttedString = activity.Text.Substring(i);
                    var index = CuttedString.Replace("surah",string.Empty).Trim();
                    i = -1;
                    int.TryParse(index, out i);
                    if (i > -1)
                    {
                        var SelectedSurah = await Quran.GetSurah(i);
                        if (SelectedSurah!=null)
                        {
                            var msg = $"{SelectedSurah.latin}.{SelectedSurah.latin}, total ayah : {SelectedSurah.totalayah}, place: {SelectedSurah.place}";
                            reply = activity.CreateReply(HttpUtility.UrlDecode(msg));
                           
                        }else
                        {
                            reply = activity.CreateReply("We can't find that index.");
                           
                        }
                    }
                }
                else
                {
                    // return our reply to the user
                    reply = activity.CreateReply($"You sent {activity.Text} which was {length} characters");
                    //await connector.Conversations.ReplyToActivityAsync(reply);
                }
                if(reply!=null)
                    await connector.Conversations.ReplyToActivityAsync(reply);
            }
            else
            {
                HandleSystemMessage(activity);
            }
            var response = Request.CreateResponse(HttpStatusCode.OK);
            return response;
        }

        private Activity HandleSystemMessage(Activity message)
        {
            if (message.Type == ActivityTypes.DeleteUserData)
            {
                // Implement user deletion here
                // If we handle user deletion, return a real message
            }
            else if (message.Type == ActivityTypes.ConversationUpdate)
            {
                // Handle conversation state changes, like members being added and removed
                // Use Activity.MembersAdded and Activity.MembersRemoved and Activity.Action for info
                // Not available in all channels
            }
            else if (message.Type == ActivityTypes.ContactRelationUpdate)
            {
                // Handle add/remove from contact lists
                // Activity.From + Activity.Action represent what happened
            }
            else if (message.Type == ActivityTypes.Typing)
            {
                // Handle knowing tha the user is typing
            }
            else if (message.Type == ActivityTypes.Ping)
            {
            }

            return null;
        }
    }
}