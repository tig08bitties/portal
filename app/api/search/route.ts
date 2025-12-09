import { NextRequest, NextResponse } from 'next/server';
import { BraveSearchAPI } from '@/lib/brave-search';
import { CovenantLookingGlass } from '@/lib/covenant-glass';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'general';

  try {
    const braveApiKey = process.env.BRAVE_API_KEY;
    const glass = new CovenantLookingGlass(braveApiKey);

    let results;

    switch (type) {
      case 'missing':
        results = await glass.findMissingPieces();
        break;
      case 'bridgeworld':
        results = await glass.searchBridgeworldComponent(query);
        break;
      case 'covenant':
        results = await glass.searchCovenantInfo(query);
        break;
      case 'assemble':
        const pieces = await glass.findMissingPieces();
        results = await glass.assemblePieces(pieces);
        break;
      default:
        const searchAPI = new BraveSearchAPI(braveApiKey);
        results = await searchAPI.search(query);
    }

    return NextResponse.json({
      success: true,
      query,
      type,
      results,
      foundation: glass.getFoundation(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, query, component } = body;

    const braveApiKey = process.env.BRAVE_API_KEY;
    const glass = new CovenantLookingGlass(braveApiKey);

    let results;

    switch (action) {
      case 'findMissing':
        results = await glass.findMissingPieces();
        break;
      case 'searchBridgeworld':
        results = await glass.searchBridgeworldComponent(component || query);
        break;
      case 'searchCovenant':
        results = await glass.searchCovenantInfo(query);
        break;
      case 'assemble':
        const pieces = await glass.findMissingPieces();
        results = await glass.assemblePieces(pieces);
        break;
      case 'generateCode':
        const foundPieces = await glass.findMissingPieces();
        results = glass.generateIntegrationCode(foundPieces);
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Unknown action' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      action,
      results,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
