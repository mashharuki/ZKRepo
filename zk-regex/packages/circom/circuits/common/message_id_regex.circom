pragma circom 2.1.5;

include "@zk-email/zk-regex-circom/circuits/regex_helpers.circom";

// regex: ((
template MessageIdRegex(msg_bytes) {
	signal input msg[msg_bytes];
	signal output out;

	var num_bytes = msg_bytes+1;
	signal in[num_bytes];
	in[0]<==255;
	for (var i = 0; i < msg_bytes; i++) {
		in[i+1] <== msg[i];
	}

	component eq[28][num_bytes];
	component lt[4][num_bytes];
	component and[23][num_bytes];
	component multi_or[4][num_bytes];
	signal states[num_bytes+1][19];
	component state_changed[num_bytes];

	states[0][0] <== 1;
	for (var i = 1; i < 19; i++) {
		states[0][i] <== 0;
	}

	for (var i = 0; i < num_bytes; i++) {
		state_changed[i] = MultiOR(18);
		lt[0][i] = LessEqThan(8);
		lt[0][i].in[0] <== 64;
		lt[0][i].in[1] <== in[i];
		lt[1][i] = LessEqThan(8);
		lt[1][i].in[0] <== in[i];
		lt[1][i].in[1] <== 90;
		and[0][i] = AND();
		and[0][i].a <== lt[0][i].out;
		and[0][i].b <== lt[1][i].out;
		lt[2][i] = LessEqThan(8);
		lt[2][i].in[0] <== 97;
		lt[2][i].in[1] <== in[i];
		lt[3][i] = LessEqThan(8);
		lt[3][i].in[0] <== in[i];
		lt[3][i].in[1] <== 122;
		and[1][i] = AND();
		and[1][i].a <== lt[2][i].out;
		and[1][i].b <== lt[3][i].out;
		eq[0][i] = IsEqual();
		eq[0][i].in[0] <== in[i];
		eq[0][i].in[1] <== 43;
		eq[1][i] = IsEqual();
		eq[1][i].in[0] <== in[i];
		eq[1][i].in[1] <== 45;
		eq[2][i] = IsEqual();
		eq[2][i].in[0] <== in[i];
		eq[2][i].in[1] <== 46;
		eq[3][i] = IsEqual();
		eq[3][i].in[0] <== in[i];
		eq[3][i].in[1] <== 48;
		eq[4][i] = IsEqual();
		eq[4][i].in[0] <== in[i];
		eq[4][i].in[1] <== 49;
		eq[5][i] = IsEqual();
		eq[5][i].in[0] <== in[i];
		eq[5][i].in[1] <== 50;
		eq[6][i] = IsEqual();
		eq[6][i].in[0] <== in[i];
		eq[6][i].in[1] <== 51;
		eq[7][i] = IsEqual();
		eq[7][i].in[0] <== in[i];
		eq[7][i].in[1] <== 52;
		eq[8][i] = IsEqual();
		eq[8][i].in[0] <== in[i];
		eq[8][i].in[1] <== 53;
		eq[9][i] = IsEqual();
		eq[9][i].in[0] <== in[i];
		eq[9][i].in[1] <== 54;
		eq[10][i] = IsEqual();
		eq[10][i].in[0] <== in[i];
		eq[10][i].in[1] <== 55;
		eq[11][i] = IsEqual();
		eq[11][i].in[0] <== in[i];
		eq[11][i].in[1] <== 56;
		eq[12][i] = IsEqual();
		eq[12][i].in[0] <== in[i];
		eq[12][i].in[1] <== 57;
		eq[13][i] = IsEqual();
		eq[13][i].in[0] <== in[i];
		eq[13][i].in[1] <== 61;
		eq[14][i] = IsEqual();
		eq[14][i].in[0] <== in[i];
		eq[14][i].in[1] <== 95;
		and[2][i] = AND();
		and[2][i].a <== states[i][1];
		multi_or[0][i] = MultiOR(17);
		multi_or[0][i].in[0] <== and[0][i].out;
		multi_or[0][i].in[1] <== and[1][i].out;
		multi_or[0][i].in[2] <== eq[0][i].out;
		multi_or[0][i].in[3] <== eq[1][i].out;
		multi_or[0][i].in[4] <== eq[2][i].out;
		multi_or[0][i].in[5] <== eq[3][i].out;
		multi_or[0][i].in[6] <== eq[4][i].out;
		multi_or[0][i].in[7] <== eq[5][i].out;
		multi_or[0][i].in[8] <== eq[6][i].out;
		multi_or[0][i].in[9] <== eq[7][i].out;
		multi_or[0][i].in[10] <== eq[8][i].out;
		multi_or[0][i].in[11] <== eq[9][i].out;
		multi_or[0][i].in[12] <== eq[10][i].out;
		multi_or[0][i].in[13] <== eq[11][i].out;
		multi_or[0][i].in[14] <== eq[12][i].out;
		multi_or[0][i].in[15] <== eq[13][i].out;
		multi_or[0][i].in[16] <== eq[14][i].out;
		and[2][i].b <== multi_or[0][i].out;
		and[3][i] = AND();
		and[3][i].a <== states[i][18];
		and[3][i].b <== multi_or[0][i].out;
		multi_or[1][i] = MultiOR(2);
		multi_or[1][i].in[0] <== and[2][i].out;
		multi_or[1][i].in[1] <== and[3][i].out;
		states[i+1][1] <== multi_or[1][i].out;
		state_changed[i].in[0] <== states[i+1][1];
		eq[15][i] = IsEqual();
		eq[15][i].in[0] <== in[i];
		eq[15][i].in[1] <== 13;
		and[4][i] = AND();
		and[4][i].a <== states[i][0];
		and[4][i].b <== eq[15][i].out;
		and[5][i] = AND();
		and[5][i].a <== states[i][3];
		and[5][i].b <== eq[15][i].out;
		multi_or[2][i] = MultiOR(2);
		multi_or[2][i].in[0] <== and[4][i].out;
		multi_or[2][i].in[1] <== and[5][i].out;
		states[i+1][2] <== multi_or[2][i].out;
		state_changed[i].in[1] <== states[i+1][2];
		eq[16][i] = IsEqual();
		eq[16][i].in[0] <== in[i];
		eq[16][i].in[1] <== 255;
		and[6][i] = AND();
		and[6][i].a <== states[i][0];
		and[6][i].b <== eq[16][i].out;
		eq[17][i] = IsEqual();
		eq[17][i].in[0] <== in[i];
		eq[17][i].in[1] <== 10;
		and[7][i] = AND();
		and[7][i].a <== states[i][2];
		and[7][i].b <== eq[17][i].out;
		multi_or[3][i] = MultiOR(2);
		multi_or[3][i].in[0] <== and[6][i].out;
		multi_or[3][i].in[1] <== and[7][i].out;
		states[i+1][3] <== multi_or[3][i].out;
		state_changed[i].in[2] <== states[i+1][3];
		eq[18][i] = IsEqual();
		eq[18][i].in[0] <== in[i];
		eq[18][i].in[1] <== 62;
		and[8][i] = AND();
		and[8][i].a <== states[i][1];
		and[8][i].b <== eq[18][i].out;
		states[i+1][4] <== and[8][i].out;
		state_changed[i].in[3] <== states[i+1][4];
		eq[19][i] = IsEqual();
		eq[19][i].in[0] <== in[i];
		eq[19][i].in[1] <== 109;
		and[9][i] = AND();
		and[9][i].a <== states[i][3];
		and[9][i].b <== eq[19][i].out;
		states[i+1][5] <== and[9][i].out;
		state_changed[i].in[4] <== states[i+1][5];
		and[10][i] = AND();
		and[10][i].a <== states[i][4];
		and[10][i].b <== eq[15][i].out;
		states[i+1][6] <== and[10][i].out;
		state_changed[i].in[5] <== states[i+1][6];
		and[11][i] = AND();
		and[11][i].a <== states[i][6];
		and[11][i].b <== eq[17][i].out;
		states[i+1][7] <== and[11][i].out;
		state_changed[i].in[6] <== states[i+1][7];
		eq[20][i] = IsEqual();
		eq[20][i].in[0] <== in[i];
		eq[20][i].in[1] <== 101;
		and[12][i] = AND();
		and[12][i].a <== states[i][5];
		and[12][i].b <== eq[20][i].out;
		states[i+1][8] <== and[12][i].out;
		state_changed[i].in[7] <== states[i+1][8];
		eq[21][i] = IsEqual();
		eq[21][i].in[0] <== in[i];
		eq[21][i].in[1] <== 115;
		and[13][i] = AND();
		and[13][i].a <== states[i][8];
		and[13][i].b <== eq[21][i].out;
		states[i+1][9] <== and[13][i].out;
		state_changed[i].in[8] <== states[i+1][9];
		and[14][i] = AND();
		and[14][i].a <== states[i][9];
		and[14][i].b <== eq[21][i].out;
		states[i+1][10] <== and[14][i].out;
		state_changed[i].in[9] <== states[i+1][10];
		eq[22][i] = IsEqual();
		eq[22][i].in[0] <== in[i];
		eq[22][i].in[1] <== 97;
		and[15][i] = AND();
		and[15][i].a <== states[i][10];
		and[15][i].b <== eq[22][i].out;
		states[i+1][11] <== and[15][i].out;
		state_changed[i].in[10] <== states[i+1][11];
		eq[23][i] = IsEqual();
		eq[23][i].in[0] <== in[i];
		eq[23][i].in[1] <== 103;
		and[16][i] = AND();
		and[16][i].a <== states[i][11];
		and[16][i].b <== eq[23][i].out;
		states[i+1][12] <== and[16][i].out;
		state_changed[i].in[11] <== states[i+1][12];
		and[17][i] = AND();
		and[17][i].a <== states[i][12];
		and[17][i].b <== eq[20][i].out;
		states[i+1][13] <== and[17][i].out;
		state_changed[i].in[12] <== states[i+1][13];
		and[18][i] = AND();
		and[18][i].a <== states[i][13];
		and[18][i].b <== eq[1][i].out;
		states[i+1][14] <== and[18][i].out;
		state_changed[i].in[13] <== states[i+1][14];
		eq[24][i] = IsEqual();
		eq[24][i].in[0] <== in[i];
		eq[24][i].in[1] <== 105;
		and[19][i] = AND();
		and[19][i].a <== states[i][14];
		and[19][i].b <== eq[24][i].out;
		states[i+1][15] <== and[19][i].out;
		state_changed[i].in[14] <== states[i+1][15];
		eq[25][i] = IsEqual();
		eq[25][i].in[0] <== in[i];
		eq[25][i].in[1] <== 100;
		and[20][i] = AND();
		and[20][i].a <== states[i][15];
		and[20][i].b <== eq[25][i].out;
		states[i+1][16] <== and[20][i].out;
		state_changed[i].in[15] <== states[i+1][16];
		eq[26][i] = IsEqual();
		eq[26][i].in[0] <== in[i];
		eq[26][i].in[1] <== 58;
		and[21][i] = AND();
		and[21][i].a <== states[i][16];
		and[21][i].b <== eq[26][i].out;
		states[i+1][17] <== and[21][i].out;
		state_changed[i].in[16] <== states[i+1][17];
		eq[27][i] = IsEqual();
		eq[27][i].in[0] <== in[i];
		eq[27][i].in[1] <== 60;
		and[22][i] = AND();
		and[22][i].a <== states[i][17];
		and[22][i].b <== eq[27][i].out;
		states[i+1][18] <== and[22][i].out;
		state_changed[i].in[17] <== states[i+1][18];
		states[i+1][0] <== 1 - state_changed[i].out;
	}

	component final_state_result = MultiOR(num_bytes+1);
	for (var i = 0; i <= num_bytes; i++) {
		final_state_result.in[i] <== states[i][7];
	}
	out <== final_state_result.out;

	signal is_consecutive[msg_bytes+1][2];
	is_consecutive[msg_bytes][1] <== 1;
	for (var i = 0; i < msg_bytes; i++) {
		is_consecutive[msg_bytes-1-i][0] <== states[num_bytes-i][7] * (1 - is_consecutive[msg_bytes-i][1]) + is_consecutive[msg_bytes-i][1];
		is_consecutive[msg_bytes-1-i][1] <== state_changed[msg_bytes-i].out * is_consecutive[msg_bytes-1-i][0];
	}
	// substrings calculated: [{(17, 18), (1, 4), (1, 1), (18, 1)}]
	signal is_substr0[msg_bytes][5];
	signal is_reveal0[msg_bytes];
	signal output reveal0[msg_bytes];
	for (var i = 0; i < msg_bytes; i++) {
		is_substr0[i][0] <== 0;
		is_substr0[i][1] <== is_substr0[i][0] + states[i+1][1] * states[i+2][1];
		is_substr0[i][2] <== is_substr0[i][1] + states[i+1][1] * states[i+2][4];
		is_substr0[i][3] <== is_substr0[i][2] + states[i+1][17] * states[i+2][18];
		is_substr0[i][4] <== is_substr0[i][3] + states[i+1][18] * states[i+2][1];
		is_reveal0[i] <== is_substr0[i][4] * is_consecutive[i][1];
		reveal0[i] <== in[i+1] * is_reveal0[i];
	}
}