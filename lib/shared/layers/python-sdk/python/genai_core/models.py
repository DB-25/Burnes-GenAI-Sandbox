import genai_core.types
import genai_core.clients
import genai_core.parameters

from genai_core.types import Modality, Provider, ModelInterface

# Original list_models function with slight modifications
def list_models():
    models = []

    bedrock_models = list_new_bedrock_models()
    if bedrock_models:
        models.extend(bedrock_models)

    # Adding a meta model directly as a dictionary
    meta_model = {
        "modelArn": "as_db_supersecret_arn",
        "provider": Provider.BEDROCK.value,
        "modelId": "meta_model_as_db_supersecret_id",
        "name": "Smart Model",
        "streaming": True,
        "inputModalities": [Modality.TEXT.value],
        "outputModalities": [Modality.TEXT.value],
        "interface": ModelInterface.LANGCHIAN.value,
        "ragSupported": True,
    }
    models.append(meta_model)

    return models

# Revised list_new_bedrock_models function with simplified model filtering
def list_new_bedrock_models():
    try:
        bedrock = genai_core.clients.get_bedrock_client(service_name="bedrock")
        if not bedrock:
            return []

        response = bedrock.list_foundation_models(
            byInferenceType=genai_core.types.InferenceType.ON_DEMAND.value,
            byOutputModality=genai_core.types.Modality.TEXT.value,
        )

        # skip_model_ids = [
        #     'amazon.titan-tg1-large',
        #     'ai21.j2-grande-instruct',
        #     'ai21.j2-jumbo-instruct',
        #     'ai21.j2-mid',
        #     'ai21.j2-ultra',
        #     'anthropic.claude-v2'
        # ]

        model_id = [
             "amazon.titan-text-express-v1",
             "amazon.titan-text-lite-v1",
             "anthropic.claude-v2:1",
             "anthropic.claude-3-sonnet-20240229-v1:0",
             "anthropic.claude-3-haiku-20240307-v1:0",
             "anthropic.claude-instant-v1",
             "ai21.j2-mid-v1",
             "ai21.j2-ultra-v1",
             "cohere.command-text-v14",
             "cohere.command-light-text-v14",
             "meta.llama2-13b-chat-v1",
             "meta.llama2-70b-chat-v1",
             "meta.llama3-8b-instruct-v1:0",
             "meta.llama3-70b-instruct-v1:0",
             "mistral.mistral-7b-instruct-v0:2",
             "mistral.mixtral-8x7b-instruct-v0:1",
        ]

        models = [{
            "provider": Provider.BEDROCK.value,
            "modelId": model["modelId"],
            "name": model.get("modelName", ""),
            "streaming": model.get("responseStreamingSupported", False),
            "inputModalities": model.get("inputModalities", []),
            "outputModalities": model.get("outputModalities", []),
            "interface": ModelInterface.LANGCHIAN.value,
            "ragSupported": True,
        } for model in response.get('modelSummaries', []) if model.get('modelId') in model_id and model.get('modelLifecycle', {}).get('status') == genai_core.types.ModelStatus.ACTIVE.value]

        return models
    except Exception as e:
        print(f"Error listing Bedrock models: {e}")
        return []
