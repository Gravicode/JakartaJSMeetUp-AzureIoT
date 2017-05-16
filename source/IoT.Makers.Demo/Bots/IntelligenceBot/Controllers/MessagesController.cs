using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.Bot.Connector;
using Newtonsoft.Json;

namespace IntelligenceBot
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
            ComputerVisionService vision = new IntelligenceBot.ComputerVisionService();
            Activity reply = null;
            if (activity.Type == ActivityTypes.Message)
            {
                string MessageStr = "";
                ConnectorClient connector = new ConnectorClient(new Uri(activity.ServiceUrl));
                if (!string.IsNullOrEmpty(activity.Text))
                {
                   
                    var y = await SentimentService.GetSentiment(activity.Text);
                    if (y != null)
                    {
                        var speaknow = "You send a " + (y.documents[0].score < 0.5 ? "negative message" : "positive message");
                        MessageStr += speaknow;
                    }
                }
                if (activity.Attachments != null && activity.Attachments.Count > 0)
                {
                   
                    foreach (var attachment in activity.Attachments)
                    {
                      
                        //MessageStr += $"{attachment.Name}, url:{attachment.ContentUrl}, type:{attachment.ContentType}.";
                        if (!string.IsNullOrEmpty(attachment.ContentUrl))
                        {
                            try
                            {
                                var res = await vision.RecognizeImageFromUrl(attachment.ContentUrl);
                                if (!string.IsNullOrEmpty(res))
                                {
                                    MessageStr += res;
                                }
                            }
                            catch {
                                MessageStr += "cannot get the attachment.";
                            }
                           
                        }
                    }
                }
                if (!string.IsNullOrEmpty(MessageStr ))
                {
                    reply = activity.CreateReply(MessageStr);
                    await connector.Conversations.ReplyToActivityAsync(reply);
                }else
                {
                    MessageStr = "Sorry, there is problem in our system.";
                    reply = activity.CreateReply(MessageStr);
                    await connector.Conversations.ReplyToActivityAsync(reply);
                }
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