import axios from 'axios';

interface CreateRunArgs {
  play_id: string;
  goal: string;
  dab_id?: string;
  shape_id?: string;
  core_block_ids?: string[];
  assembled_prompt?: string;
}

export async function createRun(backendUrl: string, args: CreateRunArgs) {
  // Fetch Play
  const playResponse = await axios.get(`${backendUrl}/api/plays/${args.play_id}`);
  const play = playResponse.data.data;

  // Build context snapshot
  const contextSnapshot: any = {
    play: {
      id: play.id,
      name: play.name,
    },
    core_blocks: [],
    config: play.config || {},
  };

  // Add DAB to snapshot if present
  if (args.dab_id) {
    const dabResponse = await axios.get(`${backendUrl}/api/dabs/${args.dab_id}`);
    const dab = dabResponse.data.data;
    contextSnapshot.dab = {
      id: dab.id,
      name: dab.name,
      role: dab.role,
    };
  }

  // Add Shape to snapshot if present
  if (args.shape_id) {
    const shapeResponse = await axios.get(`${backendUrl}/api/shapes/${args.shape_id}`);
    const shape = shapeResponse.data.data;
    contextSnapshot.shape = {
      id: shape.id,
      name: shape.name,
    };
  }

  // Add Core Blocks to snapshot
  if (args.core_block_ids && args.core_block_ids.length > 0) {
    const promises = args.core_block_ids.map(id => 
      axios.get(`${backendUrl}/api/core-blocks/${id}`)
    );
    const responses = await Promise.all(promises);
    contextSnapshot.core_blocks = responses.map(r => {
      const block = r.data.data;
      return {
        id: block.id,
        name: block.name,
        type: block.type,
      };
    });
  }

  // Create Run
  const response = await axios.post(`${backendUrl}/api/runs`, {
    play_id: args.play_id,
    goal: args.goal,
    dab_id: args.dab_id,
    shape_id: args.shape_id,
    context_snapshot: contextSnapshot,
    assembled_prompt: args.assembled_prompt,
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(response.data, null, 2),
      },
    ],
  };
}
